/* https://github.com/mnater/Hyphenopoly */
/* https://github.com/mnater/Hyphenopoly/wiki/Setup */
/* Hyphenopoly */        
var Hyphenopoly = {
         require: {
             "de": "Silbentrennungsalgorithmus"
         },
         paths: {
             patterndir: "/libraries/Hyphenopoly/patterns/",
             maindir: "/libraries/Hyphenopoly/"
         },
         setup: {
             selectors: {
                 /* ".container": {} */
                 ".hyphenate, .card": {
                                          minWordLength: 9,
                                          leftmin: 6,
                                          rightmin: 6
                                       }
             }
         }
     };
/*
var Hyphenopoly = {
                     require: {
                                  "de": "Silbentrennungsalgorithmus",
                                  "en-us": "Supercalifragilisticexpialidocious"
                              },
                     paths: {
                                maindir: "/themes/sub_theme/third/hyphenopoly/",
                                patterndir: "/themes/sub_theme/third/hyphenopoly/patterns/"
                             },
                     setup: {
                                 selectors: {
                                                ".hyphens": {
                                                               minWordLength: 9,
                                                               leftmin: 6,
                                                               rightmin: 6
                                                            }
                                             }   
                              }
                  };
                  */