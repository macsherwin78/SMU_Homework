from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
import datetime as dt


def scrape():

    # Initiate headless driver for deployment
    browser = Browser("chrome", executable_path="chromedriver", headless=True)

    # Create a dictionary for all of the scraped data
    mars_data = {}

    # Visit the Mars news page. 
    url = "https://mars.nasa.gov/news/"
    browser.visit(url)
 

    # Search for news
    # Scrape page into soup
    html = browser.html
    soup = bs(html, 'html.parser')

    # Find the latest Mars news.
    article = soup.find("div", class_="list_text")
    news_p = article.find("div", class_="article_teaser_body").text
    news_title = article.find("div", class_="content_title").text
    news_date = article.find("div", class_="list_date").text
  
    # Add the news date, title and summary to the dictionary
    mars_data["news_date"] = news_date
    mars_data["news_title"] = news_title
    mars_data["summary"] = news_p

    # While chromedriver is open go to JPL's Featured Space Image page. 
    url2 = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url2)

    # Scrape the browser into soup and use soup to find the full resolution image of mars
    # Save the image url to a variable called `featured_image_url`
    html = browser.html
    soup = bs(html, 'html.parser')
    image = soup.find('img', class_="thumb")["src"]
    img_url = "https://jpl.nasa.gov"+image
    featured_image_url = img_url
    
    # Add the featured image url to the dictionary
    mars_data["featured_image_url"] = featured_image_url


    url3 = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url3)

    html = browser.html
    weather_soup = BeautifulSoup(html, "html.parser")

    # First, find a tweet with the data-name `Mars Weather`
    tweet_attrs = {"class": "tweet", "data-name": "Mars Weather"}
    mars_weather_tweet = weather_soup.find("div", attrs=tweet_attrs)

    # Next, search within the tweet for the p tag containing the tweet text
    mars_weather = mars_weather_tweet.find("p", "tweet-text").get_text()

    url4 = "https://space-facts.com/mars/"
    browser.visit(url4)

    grab=pd.read_html(url4)
    mars_info=pd.DataFrame(grab[0])
    mars_info.columns=['Mars','Data']
    mars_table=mars_info.set_index("Mars")
    marsinformation = mars_table.to_html(classes='marsinformation')
    marsinformation =marsinformation.replace('\n', ' ')

    # Add the Mars facts table to the dictionary
    mars_data["mars_table"] = marsinformation


    # Visit the USGS Astogeology site and scrape pictures of the hemispheres
    url5 = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url5)
    html = browser.html
    soup = bs(html, 'html.parser')
    mars_hemis=[]

    for i in range (4):
        time.sleep(5)
        images = browser.find_by_tag('h3')
        images[i].click()
        html = browser.html
        soup = bs(html, 'html.parser')
        partial = soup.find("img", class_="wide-image")["src"]
        img_title = soup.find("h2",class_="title").text
        img_url = 'https://astrogeology.usgs.gov'+ partial
        dictionary={"title":img_title,"img_url":img_url}
        mars_hemis.append(dictionary)
        browser.back()

    mars_data['mars_hemis'] = mars_hemis
    # Return the dictionary
    return mars_data







if __name__ == "__main__":

    # If running as script, print scraped data
    print(scrape())
