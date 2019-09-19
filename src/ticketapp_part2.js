import eventlist from './eventlist'
import EventItem from './eventitem'

class TicketApp {

    // creates an Array of EventItems
    createEventList() {
        let list = document.getElementById('list');
        let events = this.eventlist.Items.map(item => {
            let event = new EventItem(item.Day, item.Date, item.Time, item.EventName, item.VenueName, item.VenueCity, item.MinPrice, item.IsSellingFast, item.IsSoldOut);
            list.appendChild(event.listing);
            return event;
        });
        return events;
    };
    
    // creates the dropdown menu, which users can select a location to filter by
    createLocationFilter() {   
        let locationFilter = document.getElementById('location-filter');
        let uniqueLocations = new Set()
        for (let item of this.eventlist.Items) {
            let loc = document.createElement('option');
            loc.value = item.VenueCity;
            loc.innerHTML = item.VenueCity;
            if (!uniqueLocations.has(item.VenueCity)) {
                uniqueLocations.add(item.VenueCity);
                locationFilter.appendChild(loc);
            };
        };
    };

    // filter by location, every time the location is changed, it'll rerun the filter
    filterLocation(location) {
        this.resetFilter(this.events);
        if (location) {
            this.events.forEach(event => {
                if (event.city !== location) {
                    event.listing.style.display = "none";
                };
            });
        };
    };

    // does not wipe the list of filters, it only resets the list of events and redisplays them, 
    // an eventlistener to clearAll removes the existing filters
    resetFilter(events) {
        events.forEach(event => {
            event.listing.style.display = "flex";
        });
    };

    // adding all event listeners that allow for adding/deleting filters
    createEventListeners() {
        let locationFilter = document.getElementById('location-filter');
        locationFilter.addEventListener('change', e => this.filterLocation(e.target.value));
        
        const clearAll = document.getElementById('clear-filter');
        clearAll.addEventListener('click', () => {
            this.resetFilter(this.events);
            locationFilter.value = "";
        });
    };

    // initiates application
    startApp() {
        this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
        this.events = this.createEventList();
        this.createEventListeners();
        this.createLocationFilter();
    };

};

var application = new TicketApp();
document.addEventListener('DOMContentLoaded', application.startApp());

