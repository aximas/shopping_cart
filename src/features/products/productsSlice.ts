import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../app/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';

export interface ProductState {
	products: { [id: string]: Product };
}

const initialState: ProductState = {
	products: {},
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		receiveProducts(state, action: PayloadAction<Product[]>) {
			const products = action.payload;
			products.forEach((product) => {
				state.products[product.id] = product;
			});
		},
	},
});

export const { receiveProducts } = productsSlice.actions;
export default productsSlice.reducer;

export function getNumItems(state: RootState) {
	let numItems = 0;
	for (let id in state.cart.items) {
		numItems += state.cart.items[id];
	}
	return numItems;
}

export const getMemoizedNumItems = createSelector(
	(state: RootState) => state.cart.items,
	(items) => {
		console.log('calling getMemoizedNumItems');
		let numItems = 0;
		for (let id in items) {
			numItems += items[id];
		}
		return numItems;
	},
);
