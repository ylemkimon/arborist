const t = require('tap')

const OverrideSet = require('../lib/override-set.js')

t.test('constructor', async (t) => {
  t.test('no overrides', async (t) => {
    const overrides = new OverrideSet({ overrides: undefined })
    t.type(overrides.children, Map, 'has a children Map')
    t.equal(overrides.children.size, 0, 'children has no contents')
    t.equal(overrides.parent, undefined, 'parent is undefined')
  })

  t.test('loads overrides', async (t) => {
    const overrides = new OverrideSet({
      overrides: {
        'a@1': { '.': '1.0.2' },
      }
    })

    t.ok(overrides.children.has('a@1'), 'created child')
  })

  t.test('loads child overrides as string', async (t) => {
    const overrides = new OverrideSet({
      overrides: {
        'a@1': '1.0.2',
      },
    })

    t.ok(overrides.children.has('a@1'), 'created child')
  })
})
