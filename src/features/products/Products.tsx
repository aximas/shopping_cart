import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { receiveProducts } from './productsSlice';
import { addToCard } from '../cart/cartSlice';
import { getProducts } from '../../app/api';
import styles from './Products.module.css';

export function Products() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		getProducts().then((products) => {
			// setProducts(products);
			dispatch(receiveProducts(products));
		});
	}, []);

	const products = useAppSelector((state) => state.products.products);

	return (
		<main className='page'>
			<ul className={styles.products}>
				{Object.values(products).map((product) => (
					<li key={product.id}>
						<article className={styles.product}>
							<figure>
								<img src={product.imageURL} alt={product.imageAlt} />
								<figcaption className={styles.caption}>
									{product.imageCredit}
								</figcaption>
							</figure>
							<div>
								<h1>{product.name}</h1>
								<p>{product.description}</p>
								<p>${product.price}</p>
								<button onClick={() => dispatch(addToCard(product.id))}>
									Add to Cart 🛒
								</button>
							</div>
						</article>
					</li>
				))}
			</ul>
		</main>
	);
}
