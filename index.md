## 03/10/2024

- Forgot to log but I think I started working on setting up email requests for native along with a login
- **MailTrap** Used a free mail server that intercepts emails sent to and from to test.
- can send emails through server locally but need to test on IIS being hosted.
- Went to do login but getting many CORS errors due to different origin

## TODO

- Continue figuring out CORS with Coldfusion and IIS ✅(10/10/2024)
- Test statically exported site with email ✅(10/10/2024)

---

## 02/10/2024

- Spent half the day working on the access reports for the forms (_GameFormReport)
- Tried multiple ways of generating the report
	+ Took time to fill list box with relavent fields from the selected option group
	+ Looking like best to just make a report with all fields rather than allow them to select any number
- Went back to web stuff
- Making own components, stuck on drawer
- trying to style with TailwindCSS now

### TODO

- look at implementing emailing via submit button for webpage
	1. have a shop logged in ✅(10/10/2024)
	2. query to get their email ✅(10/10/2024)
	3. send an email to whoever via the shops email with the form as an attachment ~
- Continue TailwindCSS
- continue learning native

---

## 01/10/2024

- Figured out why a UI Kitten menu item highlighted lighter, needed to change ```"primary-color-transparent": "$color-basic-100"``` (Or something similar I've forgotten now)
- Decided against using UI Kitten since they don't provide much
- Instead will use TailwindCSS to create personal components that I can reuse
- Will implement some of the UI Kitten components my own way (TODO)
- James gave me the task of creating my own tables and forms to update them
	+ They are Game themed with games, customers, orders
	+ Now using a Navigation control to go through the add forms

### TODO

- Make Reports that correspond to the data ✅(10/10/2024)
- Implement a few UI Components for native-warehouse ✅(10/10/2024)

---

## 30/09/2024

- Got a simple crosstab-query report done (JMB - Total/Qty Product) by using setting column headings, this means that they will always be there regardless of if there's data
- Started looking at React-Native so that we can potentially get a native mobile app on ios and android
- Used React Native UI Kitten for component library
	+ There's tamagui which could be alright
	+ Or writing components from scratch
- Using Bun for faster npm and builds
- The React Native app uses Expo
	+ To run for web its
		```bun expo start --web```
		or
		```bun web```
	+   To build static for the web
		```bun expo export --platform web```
		* Point IIS to dist folder

---

## 27/09/2024

- Adjusted the local-shops site, stylised consistently
- Back to access and making forms/reports now.
- Did up to Q4 into reports
- Remember to use =Count(field) for counting rows and putting on report in label
- Finished making the two queries to be used for the report (JMB - Year Product - Total + Qty)
	+ Use this to make the report depending on the product picked and the selected option in the option group
