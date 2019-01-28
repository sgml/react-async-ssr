/* --------------------
 * react-async-ssr module
 * Tests
 * ------------------*/

'use strict';

// Modules
const React = require('react'),
	{expect} = require('chai');

// Imports
const {itRendersWithSyncCompare} = require('./utils');

// Tests

describe('Suspense spaces correctly', () => {
	describe('with string inside Suspense', () => {
		itRendersWithSyncCompare('only', async ({render, Suspense}) => {
			const e = <Suspense>Inside</Suspense>;
			const h = await render(e);
			expect(h).to.equal('Inside');
		});

		describe('and string(s)', () => {
			itRendersWithSyncCompare('before', async ({render, Suspense, isStatic}) => {
				const e = (
					<div>
						Before
						<Suspense>Inside</Suspense>
					</div>
				);

				const h = await render(e);
				expect(h).to.equal(isStatic ?
					'<div>BeforeInside</div>' :
					'<div data-reactroot="">Before<!-- -->Inside</div>'
				);
			});

			itRendersWithSyncCompare('after', async ({render, Suspense, isStatic}) => {
				const e = (
					<div>
						<Suspense>Inside</Suspense>
						After
					</div>
				);

				const h = await render(e);
				expect(h).to.equal(isStatic ?
					'<div>InsideAfter</div>' :
					'<div data-reactroot="">Inside<!-- -->After</div>'
				);
			});

			itRendersWithSyncCompare('before and after', async ({render, Suspense, isStatic}) => {
				const e = (
					<div>
						Before
						<Suspense>Inside</Suspense>
						After
					</div>
				);

				const h = await render(e);
				expect(h).to.equal(isStatic ?
					'<div>BeforeInsideAfter</div>' :
					'<div data-reactroot="">Before<!-- -->Inside<!-- -->After</div>'
				);
			});
		});

		describe('and div(s)', () => {
			itRendersWithSyncCompare('before', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<div>Before</div>
						<Suspense>Inside</Suspense>
					</div>
				);

				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Before</div>Inside</div>`);
			});

			itRendersWithSyncCompare('after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<Suspense>Inside</Suspense>
						<div>After</div>
					</div>
				);

				const h = await render(e);
				expect(h).to.equal(`<div${openTag}>Inside<div>After</div></div>`);
			});

			itRendersWithSyncCompare('before and after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<div>Before</div>
						<Suspense>Inside</Suspense>
						<div>After</div>
					</div>
				);

				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Before</div>Inside<div>After</div></div>`);
			});
		});
	});

	describe('with empty inside Suspense', () => {
		itRendersWithSyncCompare('only', async ({render, Suspense}) => {
			const e = <Suspense></Suspense>;
			const h = await render(e);
			expect(h).to.equal('');
		});

		describe('and string(s)', () => {
			itRendersWithSyncCompare('before', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						Before
						<Suspense></Suspense>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}>Before</div>`);
			});

			itRendersWithSyncCompare('after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<Suspense></Suspense>
						After
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}>After</div>`);
			});

			itRendersWithSyncCompare('before and after', async ({render, Suspense, isStatic}) => {
				const e = (
					<div>
						Before
						<Suspense></Suspense>
						After
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(isStatic ?
					'<div>BeforeAfter</div>' :
					'<div data-reactroot="">Before<!-- -->After</div>'
				);
			});
		});

		describe('and div(s)', function() {
			itRendersWithSyncCompare('before', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<div>Before</div>
						<Suspense></Suspense>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Before</div></div>`);
			});

			itRendersWithSyncCompare('after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<Suspense></Suspense>
						<div>After</div>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>After</div></div>`);
			});

			itRendersWithSyncCompare('before and after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<div>Before</div>
						<Suspense></Suspense>
						<div>After</div>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Before</div><div>After</div></div>`);
			});
		});
	});

	describe('with div inside Suspense', function() {
		itRendersWithSyncCompare('only', async ({render, Suspense, openTag}) => {
			const e = <Suspense><div>Inside</div></Suspense>;
			const h = await render(e);
			expect(h).to.equal(`<div${openTag}>Inside</div>`);
		});

		describe('and string(s)', function() {
			itRendersWithSyncCompare('before', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						Before
						<Suspense><div>Inside</div></Suspense>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}>Before<div>Inside</div></div>`);
			});

			itRendersWithSyncCompare('after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<Suspense><div>Inside</div></Suspense>
						After
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Inside</div>After</div>`);
			});

			itRendersWithSyncCompare('before and after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						Before
						<Suspense><div>Inside</div></Suspense>
						After
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}>Before<div>Inside</div>After</div>`);
			});
		});

		describe('and div(s)', function() {
			itRendersWithSyncCompare('before', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<div>Before</div>
						<Suspense><div>Inside</div></Suspense>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Before</div><div>Inside</div></div>`);
			});

			itRendersWithSyncCompare('after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<Suspense><div>Inside</div></Suspense>
						<div>After</div>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Inside</div><div>After</div></div>`);
			});

			itRendersWithSyncCompare('before and after', async ({render, Suspense, openTag}) => {
				const e = (
					<div>
						<div>Before</div>
						<Suspense><div>Inside</div></Suspense>
						<div>After</div>
					</div>
				);
				const h = await render(e);
				expect(h).to.equal(`<div${openTag}><div>Before</div><div>Inside</div><div>After</div></div>`);
			});
		});
	});
});
