# Sales Analysis Dashboard

## Overview

A comprehensive Power BI dashboard designed to analyze sales data, providing key insights into revenue trends, sales quantity, and customer information. The dashboard allows users to filter data by time period, product category, and region.

## Features

- **Interactive visualizations** for revenue trends, top-selling products, top customers, and regional performance.
- **Dynamic filtering** for detailed data exploration.
- **Mobile View** to view the dashboard on mobile devices.

## Tools and Technologies Used

- **Power BI:** Dashboard creation and visualization.
- **MySQL:** Data storage and querying.
- **DAX:** Data Analysis Expressions for calculated metrics.

## Files

- **`SalesDashboard.pbix`**: Power BI dashboard file containing all the visualizations and reports.
- **`db_dump.sql`**: SQL file to set up the sales database in MySQL.

## Setup and Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/mturbes1/personal-projects.git
    ```

2. **Set Up MySQL Database:**

    - Import the `db_dump.sql` file into your MySQL database to set up the necessary tables and data.

3. **Open the Power BI Dashboard:**

    - Open the `SalesDashboard.pbix` file in Power BI Desktop.
    - Connect the dashboard to your MySQL database by configuring the data source settings in Power BI.

## Usage

1. **Explore Revenue Trends:**

    - Use the time filter to analyze sales over specific periods (e.g., months, years).

2. **View Performance:**

    - Filter into best products, markets, and customers.

## Credit

This project was made following the codebasics tutorial at https://www.youtube.com/playlist?list=PLeo1K3hjS3uva8pk1FI3iK9kCOKQdz1I9