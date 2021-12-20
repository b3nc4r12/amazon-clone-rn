const currencyFormatter = (amount) => new Intl.NumberFormat("en-ca", { style: "currency", currency: "CAD" }).format(amount);

export default currencyFormatter