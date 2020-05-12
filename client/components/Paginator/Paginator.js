import React, { Component } from 'react';
import styled from 'styled-components';
import Number from './elements/number';
import Link from 'next/link';

const Container = styled.div`
	display: flex;
	align-items: center;
`;

import PropTypes from 'prop-types';

class Paginator extends Component {
	static propTypes = {
		paginationBase: PropTypes.string.isRequired,
	};

	render() {
		const { pagination, paginationBase } = this.props;
		let { prev, next } = pagination;
		if (pagination.pageCount === 1) return null;
		prev = prev.page == 1 ? undefined : prev;

		const prevPageSlug = prev > 1 ? '/' + prev : '';
		const nextPageSlug = next.page > 1 ? '/' + next.page : '';
		return (
			<Container>
				{prev ? (
					<Link
						href={{
							pathname: '/topic',
							query: { slug: paginationBase, page: prev },
						}}
						as={paginationBase + prevPageSlug}
					>
						<a>Previos</a>
					</Link>
				) : null}
				{pagination.pages.map(pg => {
					const pageSlug = pg.page > 1 ? '/' + pg.page : '';
					return (
						<Number
							className={pg.active ? 'active' : ''}
							href={{
								pathname: '/topic',
								query: { slug: paginationBase, page: pg.page },
							}}
							as={paginationBase + pageSlug}
							page={pg.page}
							key={pg.page}
						/>
					);
				})}
				{next ? (
					<Link
						href={{
							pathname: '/topic',
							query: { slug: paginationBase, page: next.page },
						}}
						as={paginationBase + nextPageSlug}
					>
						<a>Next</a>
					</Link>
				) : null}
			</Container>
		);
	}
}

export default Paginator;
