# Week 12-Web-Scraping-and-Document-Databases 
## Objectives
* Create and connect to local MongoDB databases.
* Create, read, update, and delete MongoDB documents using the Mongo Shell.
* Create simple Python applications that connect to and modify MongoDB databases using the PyMongo library.
* Use Beautiful Soup to scrape their own data from the web.
* Save the results of web scraping into MongoDB.
* Become comfortable rendering templates with Flask using data retrieved from a Mongo database.
* Use Beautiful Soup to scrape data.
* Use PyMongo to save data to a Mongo database.
* Use Flask to render templates.

**Why are we using Mongo now? I thought SQL was the best!**
While SQL is an extremely powerful language for defining and manipulating data, it can actually be restrictive. SQL requires you to use predefined schemas to determine your data structure, and requires that all of your data follow the same structure.

A NoSQL database has a dynamic schema for unstructured data and can store data in a variety of ways. This gives it much more flexibility in practice as not all data will come structured in the same way.


### **Additional Resources**  
* [Mongo in 30 minutes](https://www.youtube.com/watch?v=pWbMrx5rVBE)

* [Python Requests](http://docs.python-requests.org/en/master/)

* [Webscraping with BeautifulSoup](https://www.dataquest.io/blog/web-scraping-tutorial-python/)

* [Python Splinter](https://splinter.readthedocs.io/en/latest/)

* [NoSQL WHY?](https://www.toptal.com/database/the-definitive-guide-to-nosql-databases#)

* [MongoDB to SQL comparison](https://docs.mongodb.com/manual/reference/sql-comparison/)

* [Which version of Chrome Do I have](https://www.whatismybrowser.com/detect/what-version-of-chrome-do-i-have)

* [This article also shows you how to find version of Chrome](https://www.howtogeek.com/299243/which-version-of-chrome-do-i-have/)

* [Chrome Driver Download](https://chromedriver.chromium.org/downloads)

* [BeautifulSoup Parser's](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-a-parser)

* [html5lib another library for parsing HTML](https://github.com/html5lib/html5lib-python)

* [Flask-PyMongo Bridges Flask and PyMongo](https://flask-pymongo.readthedocs.io/en/latest/)


# 12.1 Lesson Plan - Mastering MongoDB
* Students will be able to create and connect to local MongoDB databases

* Students will learn to create, read, update, and delete MongoDB documents using the Mongo Shell

* Students will create simple Python applications that connect to and modify MongoDB databases using the PyMongo library


* 01-Ins_MongoBasics  
    * Differences between SQL and NoSQL
        * SQL relies on relating data between tables (ie join rows of one table with rows of another)
        * NoSQL DB's are on the other hand effectively JSONs (which are typically known as BSON data - Binary JSON)
            * BSON data do not require much in way of joins because they can store objects within objects.  
                * `Database` is composed of multiple collections
                * `Collections` composed of multiple documents
                * `Individual` documents capable of containing strings, ints, booleans, arrays, and even other objects.
                
* 02-Stu_MongoClass  
* 03-Ins_CrudMongo  
    * How to create and read elements
        * Two steps needed to interface with Mongo CLI
            * open GitBash and type `mongod` - which will start mongo
            * open another GitBash terminal and type `mongo` which will open Mongo shell
        * To create a database type db name `use travel_db` if exists will move to if not will create
        * To see the existence of database can run `db` command which will let you know what database working in
        * To show all databases use `show dbs`
        * MongoDB will not save a database until some values exist within it
            * to insert a document into a databases collection use syntax db.collectionName.insert({key:value})
                * The `db` implicitly refers to the currently selected database. 
                * `collectionName` should be replaced with the name of the collection that the data will be inserted into. If the named collection does not yet exist, then mongo will create it automatically.
                * `insert({key:value})` allows users to then insert a document into the collection. Remind the students that the format of the document in functionally similar to that of a Python dictionary.

                * `db.collectionName.find().pretty()` can then be used in order to print out the data that are stored within the named collection. The pretty() method prints out the data in a more readable format.
        * to find specific documents within a collection use syntax `db.collectionName.find({key:value})`
        * to find document by id use `db.test.find(ObjectId("4ecc05e55dd98a436ddcc47c"))`
    * So far we have only created or read elements in MongoDB.  Here we show how to update and delete
        * `db.collectionName.update()` method to update documents.  Takes two objects as parameters.  
            * first object tells application document(s) to search through
            * second object informs the application on what values to change. Have to use the syntax `{set: {KEY:VALUE}}`
        * `update()` method will only update the first entry which matches.
        * to update more than one need to use `updateMany()` which will update all of the records matching a given criterion.  
        * If the document being searched for within a collection does not exist, the `update()` method will not create the document in question unless `{upsert:true}` is passed as a parameter. This option combines `update` and insert, meaning that if a document already exists that meets the given criterion, it will be updated. If the document doesn't exist, however, MongoDB will create one with the given information.
        * To add elements into an array, use `$push` instead of `$set`. This will push the value provided into the array without modifying any of the other elements.
        * Deleting documents from a Mongo collection is easy as the `db.collectionName.remove({})` method is used.

    * The object being passed into the `remove()` method dictates what key/value pairing to search for. Adding the justOne parameter will remove a single document.

    * Without the justOne parameter, all documents matching the key/value pairing will be dropped from the collection.

    * Passing an empty object into the `remove()` method will drop all documents from the collection. This is extremely risky as all of that data will be lost.

    * The `db.collectionName.drop()` method will delete the collection named from the Mongo database while `db.dropDatabase()` will delete the database itself.
    
        ```python
        # Show how to delete an entry with db.[COLLECTION_NAME].remove({justOne: true})
        db.destinations.remove({"country": "Morocco"},
        {justOne: true})

        # Show how to empty a collection with db.[COLLECTION_NAME].remove()
        db.destinations.remove({})

        # Show how to drop a collection with db.[COLLECTION_NAME].drop()
        db.destinations.drop()

        # Show how to drop a database
        db.dropDatabase()
        ```
    
* 04-Stu_DumpsterDB  

* 05-Ins_PyMongo  **--Basic Understanding for HW--**
    * Pymongo serves as interface between Python and MondgoDB.  Syntax used in Pymongo is similar to MongoDB.  IE easier than learning SQLAlchemy.  

    ```python
    # module to connect Python with MongoDB
    import pymongo
    
    # after importing create connection
    conn = 'mongodb://localhost:27017'
    
    # create connection
    client = pymongo.MongoClient(conn)
    
    ```
    
* 06-Stu_MongGrove  


# 12.2 Lesson Plan - Kiss My Fist and Scrape the Sky
* Students will be able to use Beautiful Soup to scrape their own data from the web.

* Students will learn to save the results of web scraping into MongoDB.

* installs you will need for this class
    * pip install bs4 - BeautifulSoup
    * pip install lxml - to be able to use bs lxml parser
    * pip install html5lib - It is designed to conform to the WHATWG HTML specification, as is implemented by all major web browsers.
    * pip install splinter - splinter is an open source tool for testing web applications using Python. It lets you automate browser actions, such as visiting URLs and interacting with their items.
* when using BeautifulSoup will usually need to import `requests` module as well.


* 01-Ins_SoupIntro  **--Basic Building Block--**
    * from bs4 import BeautifulSoup as bs
    * to parse HTML object will need to create variable to store object `bs(html_string,'html.parser')`
    * `DOM` is a tree whose structure is defined by the nesting of tags.  BeautifulSoup allows us to traverse and search HTML attributes, text, etc.
    * `prettify()` method returns a formatted version of object and easier to read
    * `<variableName.title` returns entire HTML element including tags themselves.
    * To collect the text contained within element and nothing else add `.text` to end of call
    * Can further clean returned text by adding `.strip()` method to the end.
    * `<variableName.body` will print entire body of HTML file with each element's tags.  If you can pull back the first paragraph of body by calling `soup.body.p.text`
    * **`find_all(<ELEMENT>)`** method returns a list containing all of the HTML elements of specific type.  Index numbers can be used to access the elements in targeted fashion. This is also an itterable object.
    
* 02-Stu_CNNSoup  **--Basic HW--**
    * There is a good example of how to traverse and loop through to pull specific header back.
    
* 03-Ins_Craigslist  
    * `requests` module is used to obtain the HTML object.
    * traversing HTML can use both elements and attributes `find_all('li',class='result-row')` 
    * **another good example of how to pull back href**
    * `HTML <span>` element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. `<span>` from [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)
    
* 04-Stu_RedditScrape  
* 05-Ins_MongoScraping  **--Important HW how to push to Mongo--**
    * **SUPER IMPORTANT BEFORE YOU CAN INSERT ITEMS INTO COLLECTION YOU NEED TO INITIALIZE MONGO DB WITH MONGOD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!**

* 06-Stu_HockeyHeaders  
* 07-Ins_Splinter  
    * [Read docs on splinter and installing Chrome Webdriver](https://splinter.readthedocs.io/en/latest/drivers/chrome.html) web driver can be used to write scripts for the browser and allows developers to simulate user interactions programmatically and scrape multiple pages along the way (think when a browser only shows a limited number of pages)
    * The driver being used for the browser interaction is 'chrome', and `False` is passed for the `headless` option/parameter. This means that the browser's actions will be displayed in a Chrome window so that the process can be seen.
    * [Interacting w Elements](https://splinter.readthedocs.io/en/latest/elements-in-the-page.html)
* 08-Stu_Splinter  
* 09-Ins_Pandas_Scraping  
    * PANDAS ALSO HAS BASIC BUILT-IN SCRAPING CAPABILITIES `pd.read_html(url)` tries to parse tablular data from HTML
    * Can also convert DataFrame back to HTML using `to_html('nameofFile')` function
* 10-Stu_Doctor_Decoder  


# 12.3 Lesson Plan - Rendering Your Data With Flask
* Students will become comfortable rendering templates with Flask using data retrieved from a Mongo database.

* Students will be able to use Beautiful Soup to scrape data

* Students will use PyMongo to save data to a Mongo database

* Students will use Flask to render templates

* Installs from this session
    * pip install Flask-PyMongo


* 01-Ins_Render_String  
    * **templates** allows ability to dynamically configure what is displayed in preconfigured template / web page.  
    * Primary goals today is to 
        * render collections (list and dicts) with Flask
        * rendering views over MongoDB with Flask
        * Scraping data into MongoDB
    * Important Flask expects templates to be stored in a top-level directory called `templates`
    * Within your index.html file the `{{text}}` double brackets mark a place where can plug in variable values.
    * dependency from `flask` must import is `render.template`
    * within your return statement call `render_template()` with only the file name of the template want rendered.
        * `text` the key word used in example corresponds to value placed in double brackets in the `index.html`.  This is how the server knows how to fill out the template.
        
* 02-Stu_Render_String  
* 03-Ins_Render_List  **--Basic HW--**
    * Biggest difference from previous example is loopting through the elements of a list.  This will be seen in the index.html file
    
    ```html
        <!--initiate the loop statement "percent brackets" are used to implement logic within our templates.         -->
        {% for name in list %}
        <li>{{name}}</li>
        <!--have to close loop with endfor       -->
        {% endfor %}
    
    ```
    
* 04-Stu_Render_List  
* 05-Ins_Render_Dict  
* 06-Stu_Render_Dict  
* 07-Ins_Render_From_Mongo  **--Basic HW--**
* 08-Stu_Render_From_Mongo  
* 09-Ins_Scrape_And_Render  **--Basic HW--**
* 10-Stu_Scrape_Weather  


# Web Scraping Homework - Mission to Mars

![mission_to_mars](Images/mission_to_mars.png)

In this assignment, you will build a web application that scrapes various websites for data related to the Mission to Mars and displays the information in a single HTML page. The following outlines what you need to do.

### Before You Begin

1. Create a new repository for this project called `web-scraping-challenge`. **Do not add this homework to an existing repository**.

2. Clone the new repository to your computer.

3. Inside your local git repository, create a directory for the web scraping challenge. Use a folder name to correspond to the challenge: **Missions_to_Mars**.

4. Add your notebook files to this folder as well as your flask app.

5. Push the above changes to GitHub or GitLab.

## Step 1 - Scraping

Complete your initial scraping using Jupyter Notebook, BeautifulSoup, Pandas, and Requests/Splinter.

* Create a Jupyter Notebook file called `mission_to_mars.ipynb` and use this to complete all of your scraping and analysis tasks. The following outlines what you need to scrape.

### NASA Mars News

* Scrape the [NASA Mars News Site](https://mars.nasa.gov/news/) and collect the latest News Title and Paragraph Text. Assign the text to variables that you can reference later.

```python
# Example:
news_title = "NASA's Next Mars Mission to Investigate Interior of Red Planet"

news_p = "Preparation of NASA's next spacecraft to Mars, InSight, has ramped up this summer, on course for launch next May from Vandenberg Air Force Base in central California -- the first interplanetary launch in history from America's West Coast."
```

### JPL Mars Space Images - Featured Image

* Visit the url for JPL Featured Space Image [here](https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars).

* Use splinter to navigate the site and find the image url for the current Featured Mars Image and assign the url string to a variable called `featured_image_url`.

* Make sure to find the image url to the full size `.jpg` image.

* Make sure to save a complete url string for this image.

```python
# Example:
featured_image_url = 'https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA16225_hires.jpg'
```

### Mars Weather

* Visit the Mars Weather twitter account [here](https://twitter.com/marswxreport?lang=en) and scrape the latest Mars weather tweet from the page. Save the tweet text for the weather report as a variable called `mars_weather`.

```python
# Example:
mars_weather = 'Sol 1801 (Aug 30, 2017), Sunny, high -21C/-5F, low -80C/-112F, pressure at 8.82 hPa, daylight 06:09-17:55'
```

### Mars Facts

* Visit the Mars Facts webpage [here](https://space-facts.com/mars/) and use Pandas to scrape the table containing facts about the planet including Diameter, Mass, etc.

* Use Pandas to convert the data to a HTML table string.

### Mars Hemispheres

* Visit the USGS Astrogeology site [here](https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars) to obtain high resolution images for each of Mar's hemispheres.

* You will need to click each of the links to the hemispheres in order to find the image url to the full resolution image.

* Save both the image url string for the full resolution hemisphere image, and the Hemisphere title containing the hemisphere name. Use a Python dictionary to store the data using the keys `img_url` and `title`.

* Append the dictionary with the image url string and the hemisphere title to a list. This list will contain one dictionary for each hemisphere.

```python
# Example:
hemisphere_image_urls = [
    {"title": "Valles Marineris Hemisphere", "img_url": "..."},
    {"title": "Cerberus Hemisphere", "img_url": "..."},
    {"title": "Schiaparelli Hemisphere", "img_url": "..."},
    {"title": "Syrtis Major Hemisphere", "img_url": "..."},
]
```

- - -

## Step 2 - MongoDB and Flask Application

Use MongoDB with Flask templating to create a new HTML page that displays all of the information that was scraped from the URLs above.

* Start by converting your Jupyter notebook into a Python script called `scrape_mars.py` with a function called `scrape` that will execute all of your scraping code from above and return one Python dictionary containing all of the scraped data.

* Next, create a route called `/scrape` that will import your `scrape_mars.py` script and call your `scrape` function.

  * Store the return value in Mongo as a Python dictionary.

* Create a root route `/` that will query your Mongo database and pass the mars data into an HTML template to display the data.

* Create a template HTML file called `index.html` that will take the mars data dictionary and display all of the data in the appropriate HTML elements. Use the following as a guide for what the final product should look like, but feel free to create your own design.

![final_app_part1.png](Images/final_app_part1.png)
![final_app_part2.png](Images/final_app_part2.png)

- - -

## Step 3 - Submission

To submit your work to BootCampSpot, create a new GitHub repository and upload the following:

1. The Jupyter Notebook containing the scraping code used.

2. Screenshots of your final application.

3. Submit the link to your new repository to BootCampSpot.

## Hints

* Use Splinter to navigate the sites when needed and BeautifulSoup to help find and parse out the necessary data.

* Use Pymongo for CRUD applications for your database. For this homework, you can simply overwrite the existing document each time the `/scrape` url is visited and new data is obtained.

* Use Bootstrap to structure your HTML template.

### Copyright

Trilogy Education Services © 2019. All Rights Reserved.
