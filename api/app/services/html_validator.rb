class HtmlValidator

  def validate(html)
    fragment = Nokogiri::HTML.fragment(html)
    fragment = ensure_one_parent_node(fragment)
    ensure_valid_parent_nodes(fragment)
    return fragment.to_s
  end

  private

  def ensure_valid_parent_nodes(fragment)
    fragment.traverse do |node|
      tag = node.name
      parent_tag = node.parent.try(:name)
      valid = is_tag_valid_with_parent(tag, parent_tag)
      if !valid
        insert_valid_parent(node)
      end
    end
  end

  def ensure_one_parent_node(fragment)
    return fragment if fragment.children.length == 1
    container_fragment = Nokogiri::HTML.fragment("<div></div>")
    container_fragment.first_element_child.children = fragment
    return container_fragment
  end

  def insert_valid_parent(node)
    tag = node.name
    validated = false
    case tag
      when "tr"
        wrap_node_and_siblings(node, "tbody")
    end
    return validated
  end

  def wrap_node_and_siblings(node, tag)
    parent = node.parent
    node_and_siblings = node.parent.children
    node_and_siblings.unlink
    wrapper = parent.add_child("<#{tag}></#{tag}>").first
    wrapper.children = node_and_siblings
  end

  def is_tag_valid_with_parent(tag, parent)
    case parent
      when "select"
        return tag === "option" || tag === "optgroup"
      when "optgroup"
        return tag === "option"
      when "tr"
        return tag === "th" || tag === "td" || tag === "style" || tag === "script" ||
          tag === "template"
      when "tbody", "thead", "tfoot"
        return tag === "tr" || tag === "style" || tag === "script" || tag === "template"
      when "colgroup"
        return tag === "col" || tag === "template"
      when "table"
        return tag === "caption" || tag === "colgroup" || tag === "tbody" ||
          tag === "tfoot" || tag === "thead" || tag === "style" ||
          tag === "script" || tag === "template"
    end
    case tag
      when "h1", "h2", "h3", "h4", "h5", "h6"
        return parent != 'h1' && parent != 'h2' && parent != 'h3' &&
          parent != 'h4' && parent != 'h5' && parent != 'h6'
      when "caption", "col", "colgroup", "frame", "head", "tbody", "td", "tfoot", "th", "thead", "tr"
        return parent == nil
    end
    return true
  end

end
