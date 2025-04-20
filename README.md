# Web Development Project 7 - CrewManager

Submitted by: **Tasneem Shabana**

This web app: **A Disney-themed crew management application that allows users to create, view, edit, and delete crewmates with Disney character integration.**

Time spent: **15** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate's attributes by clicking on one of several values
- [x] **The web app includes a summary page of all the user's added crewmates**
  - The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  - The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page 
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
  - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
  - The detail page contains extra information about the crewmate not included in the summary page
  - Users can navigate to to the edit form from the detail page

The following **optional** features are implemented:

- [x] A crewmate can be given a category upon creation which restricts their attribute value options
  - User can choose a `category` option (Pirate, Princess, Villain, Comedian) to describe their crewmate
  - Based on the category value, users are allowed to access only a subset of the possible attributes
- [x] A section of the summary page displays summary statistics about a user's crew on their crew page
  - Shows the percentage distribution of different attributes among crewmates
- [x] The summary page displays a custom "success" metric about a user's crew which changes the look of the crewmate list
  - Calculates a "Mission Success Probability" based on optimal attribute combinations

The following **additional** features are implemented:

* Disney API integration for character search and details
* Animated loading screens with Disney castle motif
* Responsive design that works on mobile and desktop
* Attribute statistics visualization
* Character detail pages with extended Disney character information
* Smooth animations and transitions throughout the app

## Video Walkthrough

Here's a walkthrough of implemented user stories:
This video:
![CrewManager Demo](React+Vite-DisneyCrewmate.gif)
[Or] this Video: 
<img src='videos/React+Vite-DisneyCrewmate.gif' title='Video Walkthrough Desktop' width='' alt='Video Walkthrough Desktop' />


GIF created with [XBox] and [cloud converter](https://cloudconvert.com/mp4-to-gif)

## Features Breakdown

### Crewmate Creation
- Search Disney characters via API
- Select from predefined categories (Pirate, Princess, Villain, Comedian)
- Each category has specific attributes
- Character images automatically imported from Disney API

### Crewmate Management
- View all crewmates in a responsive grid
- Sort by creation date (newest first)
- Edit existing crewmates
- Delete crewmates with confirmation

### Detailed View
- Expanded character information
- Disney character biography section
- Film/TV/game appearances
- Direct links to edit from detail page

### Statistics
- Attribute distribution visualization
- Mission success probability calculation
- Responsive charts and metrics

## Technical Details

- Built with React and React Router
- Uses Supabase for backend data storage
- Integrates with Disney API for character data
- Fully responsive design with Tailwind CSS
- Animation with Framer Motion
- Modern UI with loading states and transitions

## Challenges

1. **API Integration**: Handling the Disney API responses and error cases required careful state management.
2. **Data Synchronization**: Keeping the local state in sync with Supabase while maintaining good performance.
3. **Responsive Design**: Creating a layout that works well on all screen sizes while maintaining the Disney aesthetic.
4. **Animation Performance**: Balancing smooth animations with performance, especially on lower-end devices.

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Supabase credentials:

VITE_SUPABASE_URL='https://crcbttzewgrpqdrvngky.supabase.co'
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyY2J0dHpld2dycHFkcnZuZ2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTQ2NzgsImV4cCI6MjA2MDU3MDY3OH0.6MyAEfQC28CdeoxnHMyh5fQm92tsK6hDUKFFT7Md5pg

4. Run the development server: `npm run dev`

## License

 Copyright 2025 Tasneem Shabana

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.