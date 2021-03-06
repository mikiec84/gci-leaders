/**
 * RSS Library Test
 */

const fs = require('fs')
const rss = require('../../lib/rss')
const mockdate = require('mockdate')

describe('lib.rss', () => {
  let rssResponse

  beforeEach(() => {
    mockdate.set('2017-12-24T03:04:35.000Z')

    rssResponse = rss({
      data: JSON.parse(
        fs.readFileSync(`${__dirname}/../__data__/data.json`)
      ),
      data_old: JSON.parse(
        fs.readFileSync(`${__dirname}/../__data__/data_old.json`)
      ),
      data_updated: new Date('2017-12-24T03:04:19.533Z'),
    })

    rssAltResponse = rss({
      data: JSON.parse(
        fs.readFileSync(`${__dirname}/../__data__/data_alt.json`)
      ),
      data_old: undefined,
      data_updated: new Date('2017-12-24T03:04:19.533Z'),
    })
  })

  afterEach(() => {
    mockdate.reset()
  })

  it('should have the correct feed contents', () => {
    const expectedPath = `${__dirname}/../__data__/feed.xml`
    const expectedFile = fs.readFileSync(expectedPath).toString()

    expect(rssResponse.feed_xml).toEqual(expectedFile)
  })

  it('should have the correct feed_items contents', () => {
    const expectedPath = `${__dirname}/../__data__/feed_items.json`
    const expectedFile = fs.readFileSync(expectedPath).toString()

    expect(rssResponse.feed_items).toEqual(expectedFile)
  })

  it('should have the correct feed contents without old_data', () => {
    const expectedPath = `${__dirname}/../__data__/feed_alt.xml`
    const expectedFile = fs.readFileSync(expectedPath).toString()

    expect(rssAltResponse.feed_xml).toEqual(expectedFile)
  })

  it('should have the correct feed_items contents without old_data', () => {
    const expectedPath = `${__dirname}/../__data__/feed_items_alt.json`
    const expectedFile = fs.readFileSync(expectedPath).toString()
    const expectedJSON = JSON.parse(expectedFile)

    expect(JSON.parse(rssAltResponse.feed_items)).toEqual(expectedJSON)
  })
})
