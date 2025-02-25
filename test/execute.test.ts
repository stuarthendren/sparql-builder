import { Term } from 'rdf-js'
import { SelectQuery, AskQuery, ConstructQuery, UpdateQuery } from 'sparql-http-client'
import { expect } from 'chai'
import { ask, graph, select, update } from '../src/lib/execute.js'
import { SparqlQuery } from '../src/lib'
import { sparqlClient } from './_mocks.js'
import './sparql.js'

const builder: Pick<SparqlQuery, 'build'> = {
  build(): string {
    return ''
  },
}

describe('execute', () => {
  describe('select', () => {
    let execute: (client: SelectQuery<any>, requestInit: RequestInit) => Promise<readonly Record<string, Term>[]>

    beforeEach(() => {
      execute = select.execute.bind(builder)
    })

    it('passes request init to sparql client', () => {
      // given
      const client = sparqlClient()

      // when
      execute(client, {
        headers: {
          authentication: 'Bearer foobar',
        },
      })

      // then
      expect(client.select).to.have.been.calledWith('', {
        headers: {
          authentication: 'Bearer foobar',
        },
      })
    })
  })
  describe('graph', () => {
    let execute: (client: ConstructQuery<any>, requestInit: RequestInit) => Promise<Response>

    beforeEach(() => {
      execute = graph.execute.bind(builder)
    })

    it('passes request init to sparql client', () => {
      // given
      const client = sparqlClient()

      // when
      execute(client, {
        headers: {
          authentication: 'Bearer foobar',
        },
      })

      // then
      expect(client.construct).to.have.been.calledWith('', {
        headers: {
          authentication: 'Bearer foobar',
        },
      })
    })
  })
  describe('update', () => {
    let execute: (client: UpdateQuery<any>, requestInit: RequestInit) => Promise<void>

    beforeEach(() => {
      execute = update.execute.bind(builder)
    })

    it('passes request init to sparql client', () => {
      // given
      const client = sparqlClient()

      // when
      execute(client, {
        headers: {
          authentication: 'Bearer foobar',
        },
      })

      // then
      expect(client.update).to.have.been.calledWith('', {
        headers: {
          authentication: 'Bearer foobar',
        },
      })
    })
  })

  describe('ask', () => {
    let execute: (client: AskQuery<any>, requestInit: RequestInit) => Promise<boolean>

    beforeEach(() => {
      execute = ask.execute.bind(builder)
    })

    it('passes request init to sparql client', () => {
      // given
      const client = sparqlClient()

      // when
      execute(client, {
        headers: {
          authentication: 'Bearer foobar',
        },
      })

      // then
      expect(client.ask).to.have.been.calledWith('', {
        headers: {
          authentication: 'Bearer foobar',
        },
      })
    })
  })
})
