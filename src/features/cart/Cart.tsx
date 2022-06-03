import React from 'react';
import styles from './Cart.module.css';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getTotalPrice, removeFromCart, updateQuantity } from './cartSlice';

export function Cart() {
	const dispatch = useAppDispatch();
	const { products, cart } = useAppSelector((state) => state);
	const totalPrice = useAppSelector(getTotalPrice);

	function onQuantityChanged(
		e: React.FocusEvent<HTMLInputElement>,
		id: string,
	) {
		const quantity = +e.target.value || 0;
		dispatch(updateQuantity({ id, quantity }));
	}
	return (
		<main className='page'>
			<h1>Shopping Cart</h1>
			<table
				className={cn(styles.table, {
					[styles.checkoutError]: cart.checkoutState === 'ERROR',
					[styles.checkoutLoading]: cart.checkoutState === 'LOADING',
				})}
			>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(cart.items).map(([id, quantity]) => (
						<tr key={id}>
							<td>{products.products[id].name}</td>
							<td>
								<input
									type='text'
									className={styles.input}
									defaultValue={quantity}
									onBlur={(e) => {
										onQuantityChanged(e, id);
									}}
								/>
							</td>
							<td>${products.products[id].price}</td>
							<td>
								<button
									aria-label={`Remove ${products.products[id].name}from Shopping Cart`}
									onClick={() => dispatch(removeFromCart(id))}
								>
									X
								</button>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td>Total</td>
						<td></td>
						<td className={styles.total}>${totalPrice}</td>
						<td></td>
					</tr>
				</tfoot>
			</table>
			<form>
				<button className={styles.button} type='submit'>
					Checkout
				</button>
			</form>
		</main>
	);
}
