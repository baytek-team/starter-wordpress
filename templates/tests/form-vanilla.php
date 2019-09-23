<?php
// Test Output of a Vanilla Form
?>
<form method="post" enctype="multipart/form-data" id="vanilla_form" action="#">
	<div class="message error">There was a problem with your submission. Errors have been highlighted below.</div>
	<div class="form-field">
		<label class="screen-reader-text" for="input_1_1">Full Name*</label>
		<input name="input_1" id="input_1_1" type="text" value="" placeholder="Full Name*" aria-invalid="false">
		<div class="description">This is some help text for the field.</div>
	</div>
	<div class="form-field has-error">
		<label class="screen-reader-texts" for="input_1_2">Email Address*</label>
		<input name="input_2" id="input_1_2" type="email" value="JohnDoe@thatcooldomain.yep" placeholder="Email Address*" aria-invalid="false">
		<div class="description validation_message" aria-live="polite">This field is required.</div>
	</div>
	<div class="form-field has-error">
		<label class="screen-reader-text" for="input_1_3">Phone Number</label>
		<input name="input_1" id="input_1_3" type="text" value="" placeholder="Phone Number" aria-invalid="false">
		<div class="description">This is some help text for the field.</div>
		<div class="description validation_message" aria-live="polite">This field is required.</div>
	</div>
	<div class="form-field">
		<label class="screen-reader-text" for="input_1_4">Inquiry Type</label>
		<select name="input_4" id="input_1_4" aria-invalid="false">
			<option value="">Choose a type</option>
			<option value="option1">Type Option 1</option>
			<option value="option2">Type Option 2</option>
			<option value="option3">Type Option 3</option>
		</select>
	</div>
	<div class="form-field">
		<label for="input_1_5"><input name="input_5" id="input_1_5" type="radio" value="yes" aria-invalid="false"> Yes</label>
		<label for="input_1_5"><input name="input_5" id="input_1_5" type="radio" value="no" aria-invalid="false"> No</label>
		<label for="input_1_5"><input name="input_5" id="input_1_5" type="radio" value="maybe" aria-invalid="false"> Maybe</label>
	</div>
	<div class="form-field">
		<label class="screen-reader-text" for="input_1_6">Message</label>
		<textarea name="input_6" id="input_1_6" placeholder="Message" aria-invalid="false" rows="10" cols="30"></textarea>
	</div>
	<input type="submit" value="Submit">
</form>
