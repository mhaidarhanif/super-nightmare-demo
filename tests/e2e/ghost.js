const Nightmare = require('nightmare')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()

const nightmare = Nightmare({
	// openDevTools: {
	// 	mode: 'detach'
	// },
	// waitTimeout: 5000,
	// gotoTimeout: 5000,
	// loadTimeout: 5000,
	show: true
})

const URL = 'http://localhost:2368/ghost'

describe.skip('Create new post', function () {
	this.timeout(15000)

	it.skip('Expect to be able to login with admin account', function (done) {
		nightmare
			.goto(`${URL}/editor`)
			.type('input.email', 'admin@mhaidarhanif.com')
			.type('input.password', 'password')
			.click('button.login')
			.wait('input#entry-title')
			.evaluate(function () {
				return document.title
			})
			.end()
			.then(function (title) {
				expect(title).to.contain('Editor')
				console.log(title)
				done()
			})
			.catch(function (error) {
				console.error('Login failed:', error)
			})
	})

	it('Expect to be able to type post content then delete it', function (done) {
		nightmare
			.goto(`${URL}/editor`)
			.type('input#entry-title', 'Hello World!')
			.type('textarea.markdown-editor', 'Hello people of the world!')
			.click('li.post-save-draft a') // save draft first
			.wait(1000) // hold on
			.click('li.post-save-publish a') // publish draft
			.click('li.delete a') // delete post
			.then(function () {
				done()
			})
			.catch(function (error) {
				console.error('Type post failed:', error)
			})
	})

	it.skip('Expect to have the post published', function (done) {
		nightmare
			.goto(URL)
			.click('a.post-edit') // edit post
			.pause(3000)
			.type('input#entry-title', 'Hello Universe!')
			.type('input.markdown-editor', 'Hello people of the universe!')
			.click('button.js-publish-button') // save update
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

describe('Edit new post', function () {
	this.timeout(15000)

	it('Expect to be able to edit post content', function (done) {
		nightmare
			.goto(`${URL}`)
			.click('a.post-edit')
			.type('input#entry-title', 'Hello Universe!')
			.type('textarea.markdown-editor', 'Hello people of this universe!')
			.click('li.post-save-draft a') // save draft first
			.wait(1000) // hold on
			.click('li.post-save-publish a') // publish draft
			.click('li.delete a') // delete post
			.then(function () {
				done()
			})
			.catch(function (error) {
				console.error('Edit post failed:', error)
			})
	})
})
