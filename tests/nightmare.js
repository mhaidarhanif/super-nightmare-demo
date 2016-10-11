const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const chai = require('chai')
const expect = chai.expect
const should = chai.should()

const URL = 'http://localhost:2368/ghost'

describe('test yahoo search results', function () {
	this.timeout(10000)
	it('should find the nightmare github link first', function (done) {
		nightmare
			.goto(URL)
			.type('form[action*="/search"] [name=p]', 'github nightmare')
			.click('form[action*="/search"] [type=submit]')
			.wait('#main')
			.evaluate(function () {
				return document.querySelector('#main .searchCenterMiddle li a').href
			})
			.end()
			.then(function (link) {
				expect(link).to.equal('https://github.com/segmentio/nightmare')
				done()
			})
	})
})
