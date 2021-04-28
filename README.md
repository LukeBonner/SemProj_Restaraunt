# SemProj_Restaraunt

Currently the html of the project is divided into six sections

# Login Section

The login section will have two text areas and a button that should allow the user
to enter their username and password.  Upon clicking the log in button, if the
user's credentials are correct and login is successful, the login section will
then be hidden and the account section will appear

# Selection Section

The selection section is meant to be split into three main chunks:

-the filters chunk on the left, which will contain buttons and a search bar to
filter out foods listed in the middle area (the options chunk) so that the user
can access only the foods they want in a faster way

-the options chunk will be the middle area, and will be loop generated
information blocks of food with prices and a button to add the food to the
final chunk on the right (the cart chunk)

-the cart chunk is the final chunk on the right, which will keep track of
foods selected by the user, and keep a running sum.  at the bottom of this chunk
will be a checkout button that will, upon successful query to the server, hide
the Selection section and display the final section, the checkout Section.

# Checkout Section

the checkout section takes all of the user information and appears after the
clicking on the checkout button in the selection section.  all that will be displayed
here is a thank you message to the user (using username) and a brief display
of their order and total.  includes routing back to the account section

# Account Section

The account section serves as the hub and the initial routing after login, from the hub
the user can select to check their order history, aswell as start a new order
which directs them to the selection section.

# History Section

Displays user order history, aswell as allowing the user to clear an order from their
history, or completely wipe their order history. routes back to account Section.

# Menu Editing Section

Allows users with special priviliges to edit the menu by adding, deleting, and modifying menu items.
Routes back to the account section

# Who worked on what

Mark will be handling:
-missing, presumed to have dropped class

Luke worked on:
 -initial project structure
 -login
 -Selection
 -Checkout
 -Firebase
 

Kevin worked on:
  -fine tuning (style improvements and some bug fixes)
  -History
  -Account
  -Menu Editing
  -Database rules

# How to edit the menu
The UI for editing the menu in the app may need some explaining;
it's not super intuitive (it's meant for employees only, so that's not a huge issue).

First click on one of the buttons for the four category (Appetizers, Entrees,
Desserts, Sides). You will see the list of items in that category, and below that you
will see 3 forms: Name, Price, and Description. These forms serve a double purpose.
They are used both for adding new items and editing existing ones.

When the "Add Item" button at the top is clicked, the current values in the form will be used
as the values for the new menu item. The name and price fields must contain something in order
to add an item, otherwise, nothing will happen. The price field must also contain a number 
written in a format that ParseFloat can understand.

To edit an existing item it must be selected. Each row in the table of items has a "Select Item"
button which will select that item. While, an item is selected, its fields can be updated.
When you press the "Update Name", "Update Price", or "Update Description" buttons, the
respective data field in the currently selected menu item will be replaced by the value of
the corresponding input field. In this way, it's possible to update the name, price, 
and description independently of one another.

Deleting an item is easy: just press the "delete item" button
