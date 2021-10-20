const t = require('tap')

const OverrideSet = require('../lib/override-set.js')

t.test('constructor', async (t) => {
  t.test('loads overrides', async (t) => {
    const overrides = new OverrideSet({
      overrides: {
        'a@1': { '.': '1.0.2' },
      },
    })

    t.ok(overrides.children.has('a@1'), 'created child')

    const edgeRule = overrides.getEdgeRule({ name: 'a', spec: '^1.0.1' })
    t.ok(edgeRule, 'found a rule for a matching edge')

    const keySpecRule = overrides.getNodeRule({ name: 'a', version: '1.0.1' })
    t.ok(keySpecRule, 'found a rule by keySpec')

    const valueRule = overrides.getNodeRule({ name: 'a', version: '1.0.2' })
    t.ok(valueRule, 'found a rule by value')

    t.equal(keySpecRule, valueRule, 'both node rules are identical')
  })

  t.test('loads child overrides as string', async (t) => {
    const overrides = new OverrideSet({
      overrides: {
        'a@1': '1.0.2',
      },
    })

    t.ok(overrides.children.has('a@1'), 'created child')

    const edgeRule = overrides.getEdgeRule({ name: 'a', spec: '^1.0.1' })
    t.ok(edgeRule, 'found a rule for a matching edge')

    const keySpecRule = overrides.getNodeRule({ name: 'a', version: '1.0.1' })
    t.ok(keySpecRule, 'found a rule by keySpec')

    const valueRule = overrides.getNodeRule({ name: 'a', version: '1.0.2' })
    t.ok(valueRule, 'found a rule by value')

    t.equal(keySpecRule, valueRule, 'both node rules are identical')
  })
})
