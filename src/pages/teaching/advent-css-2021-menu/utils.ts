const { format } = Intl.NumberFormat("en-GB", {
	style: "currency",
	currency: "GBP",
});

export const formatPrice = (price: number) => {
	return format(price / 100);
};
