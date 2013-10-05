// includes.jsx
  var path = ((File($.fileName)).path);

  $.evalFile(File(path + '/submodules/tomljs/toml.js')); // https://github.com/JonAbrams/tomljs

  $.evalFile(File(path + '/submodules/JsonDiffPatch/src/jsondiffpatch.js')); // https://github.