# SemProj_Restaraunt

Currently the html of the project is divided into three sections

# Login Section
The login section will have two text areas and a button that should allow the user
to enter their username and password.  Upon clicking the log in button, if the
user's credentials are correct and login is successful, the login section will
then be hidden and the selection section will appear


#Selection Section
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
the Selection section and display the final section, the checkout Section

#checkout Section

the checkout section takes all of the user information and appears after the
clicking on the checkout button in the selection section.  all that will be displayed
here is a thank you message to the user (using username) and a brief display
of their order and total.


Mark will be handling:
  -Sign in
  -Accounts
  -Storing orders

Luke will be handling:
  -UI design
  -generating from database
  -github

Kevin will be handling:
  -(awaiting return from medical leave)
