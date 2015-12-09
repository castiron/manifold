class HtmlToObject

  def convert(html)
    reset()
    fragment = Nokogiri::HTML.fragment(html)
    if fragment.children.length > 1
      container_fragment = Nokogiri::HTML.fragment('<div></div>')
      container_fragment.first_element_child.children = fragment
      fragment = container_fragment
    end
    node = fragment.children.first
    output = visit(node)
    return output
  end

  protected

  def visit(node)
    representation = {}
    beginVisit(node, representation)
    children = traverse(node, representation)
    representation[:children] = children unless children.nil?
    endVisit(node, representation)
    return representation
  end

  def traverse(node, representation)
    children = nil
    node.children.each do |child_node|
      children ||= []
      children.push visit(child_node)
    end
    children
  end

  def endVisit(node, representation)

  end

  def beginVisit(node, representation)
    return beginVisitElement(node, representation) if node.element?
    return beginVisitComment(node, representation) if node.comment?
    return beginVisitText(node, representation) if node.text?
  end

  def beginVisitElement(node, representation)
    representation[:node_type] = "element"
    representation[:tag] = node.name
    representation[:attributes] = node.attributes
                                    .transform_keys { |k| k.to_sym }
                                    .transform_values { |v| v.content }
  end

  def beginVisitComment(node, representation)
    representation[:node_type] = "comment"
    representation[:content] = node.content
  end

  def beginVisitText(node, representation)
    representation[:node_type] = "text"
    representation[:content] = node.content
  end

  def reset
    @parentNode = nil
    @currentNode = nil
    @level = 0
    @path = []
  end

end
