import nock from 'nock'
import { describe, it } from '@jest/globals'
import { FLY_API_GRAPHQL } from '../src/client'
import { createClient } from '../src/main'

const fly = createClient('test-token')

describe('volume', () => {
  const volume = {
    id: 'vol_kgj5450qk1qry2wz',
    name: 'ctwntjgykzxhfncfwrfo_pgdata',
    region: 'hkg',
    sizeGb: 2,
    encrypted: false,
    createdAt: '2023-02-23T04:58:02Z',
    host: { id: '6d56' },
    app: { name: 'ctwntjgykzxhfncfwrfo' },
  }

  it('creates volume', async () => {
    nock(FLY_API_GRAPHQL)
      .post('/graphql')
      .reply(200, {
        data: {
          createVolume: {
            app: {
              name: 'ctwntjgykzxhfncfwrfo',
            },
            volume,
          },
        },
      })
    const data = await fly.Volume.createVolume({
      appId: 'ctwntjgykzxhfncfwrfo',
      name: 'ctwntjgykzxhfncfwrfo_pgdata',
      region: 'hkg',
      sizeGb: 2,
    })
    console.dir(data, { depth: 5 })
  })

  it('deletes volume', async () => {
    nock(FLY_API_GRAPHQL)
      .post('/graphql')
      .reply(200, {
        data: {
          deleteVolume: {
            app: {
              name: 'ctwntjgykzxhfncfwrfo',
            },
          },
        },
      })
    const data = await fly.Volume.deleteVolume({
      volumeId: 'vol_kgj5450qk1qry2wz',
    })
    console.dir(data, { depth: 5 })
  })

  it('forks volume', async () => {
    nock(FLY_API_GRAPHQL)
      .post('/graphql')
      .reply(200, {
        data: {
          forkVolume: {
            app: {
              name: 'ctwntjgykzxhfncfwrfo',
            },
            volume,
          },
        },
      })
    const data = await fly.Volume.forkVolume({
      appId: 'ctwntjgykzxhfncfwrfo',
      sourceVolId: 'vol_kgj5450qk1qry2wz',
    })
    console.dir(data, { depth: 5 })
  })
})
