# 3.5.0 (2017-05-14)

  * feat: Add `debounce` and `failsafe` options. More details in
  documentation, #27 and #28

# 3.4.1 (2015-12-14)

  * fix: handle custom container with offset 06b295e7982912e84d8e8226c49c10c782408cba
  * fix(setTimeout): no need to add nodes in a setTimeout it seems e614061ee307449b3d539fc33d2431b6afe5fb6c

# 3.4.0 (2015-06-03)

  * feat: add a watcher.dispose()/.watch() API
    Now you can remove a watched node or re-watch it anytime.
    fixes #7

# 3.2.0 (2015-05-24)

  * fix: children of hidden parents were not displayed, use a setInterval for this

# 3.1.0 (2015-05-23)

  * feat: hidden elements should not be considered visible when scrolling
    fixes #9

# 3.0.2 (2015-03-14)

  * build with closure compiler

# 1.0.1 (2015-01-25)

  * small library fix (1.0.0 was broken)

# 1.0.0 (2015-01-25)

  * refactor using commonJS
