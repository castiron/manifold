require "rails_helper"

RSpec.describe HtmlToObject do

  let(:converter) { HtmlToObject.new() }

  it "should wrap top level siblings in a div element" do
    node = "<p>AAA</p><p>BBB</p>"
    object = {
      node_type: "element", tag: "div", attributes: {},
      children: [
        {node_type: "element", tag: "p", attributes: {}, children: [{node_type: "text", content: "AAA"}]},
        {node_type: "element", tag: "p", attributes: {}, children: [{node_type: "text", content: "BBB"}]}
      ]
    }
    expect(converter.convert(node)).to eq(object)
  end

  it "should convert a simple HTML node into a JSON object" do
    node = "<div>AAA</div>"
    object = {
      node_type: "element", tag: "div", attributes: {},
      children: [
        { node_type: "text", content: "AAA" }
      ]
    }
    expect(converter.convert(node)).to eq(object)
  end

  it "should extract element attributes" do
    node = "<div class=\"AAA\"></div>"
    object = {
      node_type: "element", tag: "div", attributes: {:class => "AAA"}
    }
    expect(converter.convert(node)).to eq(object)
  end

  it "should extract comment node content" do
    node = "<div>AAA<!--BBB-->CCC</div>"
    object = {
      node_type: "element", tag: "div", attributes: {}, children: [
        { node_type: "text", content: "AAA" },
        { node_type: "comment", content: "BBB" },
        { node_type: "text", content: "CCC" }
      ]
    }
    expect(converter.convert(node)).to eq(object)
  end

  it "should correctly handle an element inside a text node" do
    node = "<div>AAA<span>BBB</span>CCC</div>"
    object = {
      node_type: "element", tag: "div", attributes: {}, children: [
        { node_type: "text", content: "AAA" },
        { node_type: "element", tag: "span", attributes: {}, children: [
          { node_type: "text", content: "BBB" }
        ] },
        { node_type: "text", content: "CCC" }
      ]
    }
    expect(converter.convert(node)).to eq(object)
  end

end
