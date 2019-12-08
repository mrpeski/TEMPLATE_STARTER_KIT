import "jqtree"
import "jqtree/jqtree.css"

var data = [
    {
        label: "Legal Documents",
        id: 1,
        children: [{ label: "child1", id: 2 }, { label: "child2", id: 3 }]
    },
    {
        label: "Medical Documents",
        id: 4,
        children: [{ label: "child3", id: 5 }]
    }
];


var $tree = $('#tree1');

$tree.tree({
    data: data,
    autoOpen: -1,
    dragAndDrop: true,
    onCreateLi: function(node, $li) {
        // Append a link to the jqtree-element div.
        // The link has an url '#node-[id]' and a data property 'node-id'.
        $("#tree1").children("ul").each(function($item) {
            $(this).addClass("reset--ul");
        })
        $li.addClass("jqtree-closed");
        // $li.parent("ul.jqtree_common").addClass("reset--ul");
        // $li.find('.jqtree-element').append(
        //     '<a href="#node-'+ node.id +'" class="edit btn btn-sm btn-primary" style="float: right" data-node-id="'+ node.id +'">edit</a>'
        // );
    },

});

// Handle a click on the edit link
$tree.on( 'click', '.edit', function(e) {
    // Get the id from the 'node-id' data property
    var node_id = $(e.target).data('node-id');

    // Get the node from the tree
    var node = $tree.tree('getNodeById', node_id);

    if (node) {
        // Display the node name
        alert(node.name);
    }
})
