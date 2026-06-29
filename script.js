/*
  ============================================================
  FRESHFOLD LAUNDRY — SCRIPT.JS
  ============================================================

  HOW JAVASCRIPT WORKS (simple explanation):

  JavaScript makes the page interactive. It can:
  - Listen for clicks, scrolls, and input changes
  - Read and change HTML content
  - Show or hide elements
  - Do calculations and update the page with results

  KEY CONCEPTS YOU'LL SEE HERE:

  1. document.getElementById('some-id')
     → Find an element on the page by its id
     → Like doing ctrl+F and searching for it

  2. element.classList.add('class-name')
     → Add a CSS class to an element
     → Changes how it looks (CSS has the styling rules)

  3. element.classList.remove('class-name')
     → Remove a CSS class from an element

  4. element.textContent = 'new text'
     → Change the text inside an element

  5. element.innerHTML = '<li>item</li>'
     → Change the HTML inside an element

  ============================================================
*/


/* ============================================================
   DATA — Service details for the clickable cards
   This is a JavaScript ARRAY (list) of OBJECTS.

   An ARRAY looks like: [item1, item2, item3]
   An OBJECT looks like: { key: value, key: value }

   When a card is clicked, we use the index (0, 1, 2, 3)
   to grab the right item from this list.
============================================================ */

const serviceDetails = [
  // Index 0 — Wash & Fold
  {
    title: "Wash & Fold",
    description: "Perfect for everyday clothes — t-shirts, jeans, underwear, socks. We wash in cold water to preserve colors, dry on medium heat, and fold neatly.",
    tags: ["Cottons", "Jeans", "T-shirts", "Underwear", "Kids clothes"]
  },

  // Index 1 — Wash & Iron
  {
    title: "Wash & Iron",
    description: "For work clothes and anything you want wrinkle-free. Washed, dried, and steamed to a sharp finish. Great for school uniforms too.",
    tags: ["Office shirts", "Trousers", "School uniforms", "Blouses", "Skirts"]
  },

  // Index 2 — Dry Cleaning
  {
    title: "Dry Cleaning",
    description: "Chemical solvent cleaning for fabrics that cannot be washed in water. We treat stains individually and inspect every item before return.",
    tags: ["Suits", "Lace", "Silk", "Agbada", "Bridesmaid gowns", "Wool"]
  },

  // Index 3 — Duvet & Bedding
  {
    title: "Duvet & Bedding",
    description: "Deep-cleaning for larger household items. We use industrial machines to handle duvets, thick blankets, and curtains that won't fit a home machine.",
    tags: ["Duvets", "Pillows", "Blankets", "Curtains", "Mattress covers"]
  }
];


/* ============================================================
   FUNCTION 1: selectService(clickedCard, index)
   Called when a service card is clicked.

   What it does:
   1. Removes "active" from ALL cards (deselects everything)
   2. Adds "active" to the card that was clicked
   3. Fills the detail panel with the right data
   4. Shows the detail panel
============================================================ */

function selectService(clickedCard, index) {

  // Step 1: Get all cards on the page as a list
  // querySelectorAll returns ALL elements with that class
  const allCards = document.querySelectorAll('.service-card');

  // Step 2: Loop through ALL cards and remove "active" from each
  // forEach = "for each item in the list, do this function"
  allCards.forEach(function(card) {
    card.classList.remove('active');
  });

  // Step 3: Add "active" to only the card that was clicked
  // (clickedCard was passed in via onclick="selectService(this, 0)")
  clickedCard.classList.add('active');

  // Step 4: Get the data for this service using the index
  // serviceDetails[0] = first object, serviceDetails[1] = second, etc.
  const data = serviceDetails[index];

  // Step 5: Find the elements inside the detail panel and fill them
  document.getElementById('detail-title').textContent = data.title;
  document.getElementById('detail-desc').textContent = data.description;

  // Step 6: Build the tags list (li = list item)
  // data.tags.map() transforms each tag into an HTML string
  // .join('') combines the array into one string with no separator
  const tagList = document.getElementById('detail-tags');
  tagList.innerHTML = data.tags.map(function(tag) {
    return '<li>' + tag + '</li>';
  }).join('');

  // Step 7: Show the detail panel by adding the "show" class
  // CSS has: .detail-panel.show { display: block; }
  const panel = document.getElementById('detail-panel');
  panel.classList.add('show');
}


/* ============================================================
   FUNCTION 2: toggleStep(clickedStep)
   Called when a "how it works" step is clicked.

   What it does:
   1. Checks if the clicked step is already active
   2. If YES — deactivate it (toggle closed)
   3. If NO — deactivate all steps, then activate the clicked one
============================================================ */

function toggleStep(clickedStep) {

  // Check if the clicked step already has "active"
  // classList.contains() returns true or false
  const isAlreadyActive = clickedStep.classList.contains('active');

  // Step 1: Remove "active" from ALL steps first
  const allSteps = document.querySelectorAll('.step');
  allSteps.forEach(function(step) {
    step.classList.remove('active');
  });

  // Step 2: If it WASN'T already active, add "active" to open it
  // If it WAS already active, we already removed it above = it closes
  if (!isAlreadyActive) {
    clickedStep.classList.add('active');
  }
}


/* ============================================================
   FUNCTION 3: calcPrice()
   Called when the dropdown or slider changes.

   What it does:
   1. Reads the selected service type
   2. Reads the slider value (quantity)
   3. Looks up the price rate for that service
   4. Multiplies quantity × rate
   5. Displays the result
============================================================ */

// Price rates per unit for each service
// This is an OBJECT (like a dictionary) — key: value pairs
const priceRates = {
  wash:  800,   // ₦800 per kg
  iron:  1200,  // ₦1,200 per kg
  dry:   3500,  // ₦3,500 per item
  duvet: 4000   // ₦4,000 per set
};

// What unit each service uses (for the label text)
const unitNames = {
  wash:  'kg',
  iron:  'kg',
  dry:   'items',
  duvet: 'sets'
};

function calcPrice() {

  // Read the currently selected option from the dropdown
  // .value gives us: "wash", "iron", "dry", or "duvet"
  const serviceType = document.getElementById('calc-service').value;

  // Read the slider's current number
  // parseInt() converts "5" (text) to 5 (number)
  const quantity = parseInt(document.getElementById('calc-slider').value);

  // Get the right unit name for this service
  const unit = unitNames[serviceType];

  // Update the label text (e.g. "Weight (kg)" or "Quantity (items)")
  document.getElementById('calc-label').textContent = 'Quantity (' + unit + ')';

  // Update the number shown next to the slider
  document.getElementById('calc-value').textContent = quantity + ' ' + unit;

  // Calculate the total price
  // priceRates['wash'] = 800, then 800 × 5 = 4000
  const total = quantity * priceRates[serviceType];

  // Format the number with commas (e.g. 4000 → "4,000")
  // toLocaleString() automatically adds commas for Nigerian number format
  const formattedTotal = '₦' + total.toLocaleString();

  // Update the total display on the page
  document.getElementById('calc-total').textContent = formattedTotal;
}


/* ============================================================
   FUNCTION 4: submitBooking()
   Called when the "Book my pickup" button is clicked.

   What it does:
   1. Reads all form field values
   2. Checks they are not empty (validation)
   3. If valid — shows the success message and changes button
   4. If invalid — highlights the empty field
============================================================ */

function submitBooking() {

  // Read the value from each input field
  // .value gives us whatever text the user typed
  // .trim() removes spaces from start and end
  const name    = document.getElementById('b-name').value.trim();
  const phone   = document.getElementById('b-phone').value.trim();
  const address = document.getElementById('b-address').value.trim();
  const service = document.getElementById('b-service').value;

  // VALIDATION: Check if any field is empty
  // The OR operator (||) means "or" — if ANY of these is empty...
  if (!name || !phone || !address || !service) {

    // Find the first empty field and focus it (bring cursor there)
    if (!name)    { document.getElementById('b-name').focus(); return; }
    if (!phone)   { document.getElementById('b-phone').focus(); return; }
    if (!address) { document.getElementById('b-address').focus(); return; }
    if (!service) { document.getElementById('b-service').focus(); return; }

    // "return" stops the function here — don't continue
    return;
  }

  // If we get here, all fields are filled — show success!

  // Show the hidden success message
  const successMsg = document.getElementById('success-msg');
  successMsg.classList.add('show');

  // Update the button to confirm it worked
  const button = document.querySelector('.btn-book');
  button.textContent = '✓ Booking confirmed!';
  button.style.background = '#1D9E75'; // change to green
  button.style.color = '#ffffff';
  button.disabled = true; // prevent double-clicking
}


/* ============================================================
   FUNCTION 5: scrollToSection(sectionId)
   Called by the hero buttons to scroll to a section.

   What it does:
   - Finds the section with the given id
   - Smoothly scrolls the page down to it
============================================================ */

function scrollToSection(sectionId) {

  // Find the element with that id on the page
  const targetSection = document.getElementById(sectionId);

  // Scroll smoothly to it
  // behavior: 'smooth' = animated scroll, not instant jump
  targetSection.scrollIntoView({ behavior: 'smooth' });
}


/* ============================================================
   ON PAGE LOAD — Run calcPrice() once so the total shows correctly
   when the page first loads.

   window.onload = "when the page finishes loading, run this"
============================================================ */

window.onload = function() {
  calcPrice(); // Set the initial calculator total
};
