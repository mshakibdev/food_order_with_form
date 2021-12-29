import classes from "./Checkout.module.css";
import {useRef, useState} from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

function Checkout(props) {
	const [formsInputValidity, setFormsInputValidity] = useState({name: true, street: true, city: true, postalCode: true});

	const nameRef = useRef();
	const streetRef = useRef();
	const postalCodeRef = useRef();
	const cityRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameRef.current.value;
		const enteredStreet = streetRef.current.value;
		const enteredPostalCode = postalCodeRef.current.value;
		const enteredCity = cityRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

		setFormsInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIsValid,
		});

		const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

		if (!formIsValid) {
			return;
		}
	};

	const nameControlClass = `${classes.control} ${formsInputValidity.name ? "" : classes.invalid}`;
	const streetControlClass = `${classes.control} ${formsInputValidity.street ? "" : classes.invalid}`;
	const postalCodeControlClass = `${classes.control} ${formsInputValidity.postalCode ? "" : classes.invalid}`;
	const cityControlClass = `${classes.control} ${formsInputValidity.city ? "" : classes.invalid}`;
	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={classes.control}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formsInputValidity.name && <p>Enter a valid Name</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetRef} />
				{!formsInputValidity.street && <p>Enter a valid street Name</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeRef} />
				{!formsInputValidity.postalCode && <p>Enter a valid postal code</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityRef} />
				{!formsInputValidity.city && <p>Enter a valid city name</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
}

export default Checkout;
