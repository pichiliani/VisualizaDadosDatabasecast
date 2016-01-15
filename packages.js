(function() {
  packages = {

    // Lazily construct the package hierarchy from class names.
    root: function(classes) {
      var map = {};

      // Nesta fun��o l� os dados do JSON e coloca na estrutura de mem�ria (node)
      function find(name, data) {
        var node = map[name], i;

        if (!node) {
          node = map[name] = data || {name: name, children: [], id_no: 0, URL:""};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
              // node.key = name.substring(i + 1);
            node.key = name.substring(1) + data.id_no;
            node.id_no = data.id_no;
            node.URL = data.URL;
            
            // alert(JSON.stringify(name));
              // node.key = data.id_node;
            
          }
          
          
        }

        return node;
      }

      classes.forEach(function(d) {
          /*
          x = d.name.replace("|", "�")
          x = x.replace(";", "�")
          x = x.replace("<","�")
          x = x.replace(">", "�")
          x = x.replace("$", "�")
          x = x.replace("%", "�")
          x = x.replace("_", "�")
          x = x.replace("+", "�")
          x = x.replace("-", "�")
          x = x.replace("/", "�")
          x = x.replace("*", "�")
          */
          find(d.name, d);
      });

      return map[""];
    },

    // Return a list of imports for the given array of nodes.
    imports: function(nodes) {
      var map = {},
          imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.imports) d.imports.forEach(function(i) {
          imports.push({source: map[d.name], target: map[i]});
        });
      });

      return imports;
    }

  };
})();
