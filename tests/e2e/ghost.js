const Nightmare = require('nightmare')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()

const nightmare = Nightmare({
	// openDevTools: {
	// 	mode: 'detach'
	// },
	waitTimeout: 50000,
	gotoTimeout: 50000,
	loadTimeout: 50000,
	width: 1000,
	height: 600,
	typeInterval: 20,
	show: true
})

const URL = 'http://localhost:2368/ghost'

describe('Create new post', function () {
	this.timeout(15000)

	it.skip('Expect to be able to login with admin account', function (done) {
		nightmare
			.goto(`${URL}/editor`)
			.type('input.email', 'admin@admin.com')
			.type('input.password', 'adminadmin')
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
			.wait(1000)
			.click('button.btn-red') // confirm delete
			.wait(1000)
			.then(function () {
				done()
			})
			.catch(function (error) {
				console.error('Type post failed:', error)
			})
	})

	it.skip('Expect to have the post published', function (done) {})
})

describe('Edit post', function () {
	this.timeout(15000)

	it('Expect to be able to edit post content', function (done) {
		nightmare
			.goto(`${URL}`)
			.wait('section.content-preview')
			.click('.post-controls a.post-edit')
			.type('input#entry-title', 'Hello Universe!')
			.type('textarea.markdown-editor', 'Hello people of this universe!')
			.wait(5000) // wait for auto save
			.then(function () {
				done()
			})
			.catch(function (error) {
				console.error('Edit post failed:', error)
			})
	})
})

describe('Delete post', function () {
	this.timeout(15000)

	it('Expect to be able to delete latest post', function (done) {
		nightmare
			.goto(`${URL}`)
			.wait('section.content-preview')
			.click('.post-controls a.post-edit') // go to edit page
			.wait('textarea.markdown-editor')
			.click('li.delete a') // delete post
			.click('button.btn-red') // confirm delete
			.wait(1000)
			.then(function () {
				done()
			})
			.catch(function (error) {
				console.error('Delete post failed:', error)
			})
	})
})
