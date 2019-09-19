## Part 3

Q: Tell us about the possible reasons that the filter your implemented in part 2 did not help the customer experience. What could you change to improve the filter experience, and why do you think it would be better for the customer?

A: I believe that providing a wider array of options for customers is important to their experience. Filtering by cities removes other appealing options. When selecting a city, it would be advantageous to also include events within a specified radius or events in neighboring cities. However, I am unable to implement an area search feature with the information provided. 

If there were a larger sample of events, another potential issue could be that customers also factored in price, date, etc... In that scenario, the customer would have to manually search a long list of events for the desired date and price range. I also changed a portion of the provided json to include sold out events. This allowed me to create another filter to only show available events.

## Notes

* In order to run part 2 and part 3 of the challenge separately, please modify line 6 of the `webpack.config.js`. 
    * To run part 2, please write: `entry: './src/ticketapp_part2.js',`
    * To run part 3, please write: `entry: './src/ticketapp_part3.js',`

* The interesting part of the project was creating an efficient filtration system. I decided to layer filters: through every filter, the list of events would wither down. To do this, I managed filters within a set, such that I could execute the filters when a current filter has been changed or removed. When a new filter is added to the set, existing filters should not be executed. It compounds onto the existing filters, and only targets the events that have already been filtered.
