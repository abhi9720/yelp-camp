
const reviewForm = document.querySelector('#review-form');
const inputs = document.querySelectorAll("input[type='radio']");

for (let input of inputs) {
	input.addEventListener('click', (e) => {
		document.querySelector('#review-feedback').innerHTML = '<span style="color: red;"> Thanks for Rating </span>';
	});
}

reviewForm.addEventListener('submit', (e) => {
	var ischecked = false;
	for (let input of inputs) {
		//  console.log(input.checked);

		if (input.checked) {
			ischecked = true;
		}
	}

	if (!ischecked) {
		document.querySelector('#review-feedback').innerHTML =
			'<span style="color: red;"> please give some star rating </span>';
		e.preventDefault();
	} else {
		return;
	}
});
