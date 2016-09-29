# twig-inject-svg

Implementation of a inline injector for [Twig](http://twig.sensiolabs.org/) templates using RegExp to replace and manipulate the content.

This plugin will inject SVG content into targed sources making the minimum changes possible.

## Usage

The plugin can receive one optional parameter `basePath`, it is used as a prefix when looking for the SVG files, if not informmed than will use "" (empty).

If the file does not exits the plugin will keep the tag is it was before.

### Example:

``` twig
<!DOCTYPE html>
<html>
    <head>
        <title>My Webpage</title>
    </head>
    <body>
        <ul{{ attributes }} id="navigation">
        {% for item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% endfor %}
        </ul>
        <img src="images/cordona.svg" alt="it is not a kiwi">
        <img src="images/kiwi.png" alt="it's a kiwi">
        <img src="images/kiwi.svg" alt="it's a kiwi">
```

Output (file `images/codorna.svg` does not exist)

``` twig
<!DOCTYPE html>
<html>
    <head>
        <title>My Webpage</title>
    </head>
    <body>
        <ul{{ attributes }} id="navigation">
        {% for item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% endfor %}
        </ul>
        <img src="images/cordona.svg" alt="it is not a kiwi">
        <img src="images/kiwi.png" alt="it's a kiwi">
        <svg version="1.1" id="kiwi-special" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="612px" height="502.174px" viewbox="0 65.326 612 502.174" enable-background="new 0 65.326 612 502.174" xml:space="preserve" alt="it&apos;s a kiwi"> 
            ... 
        </svg>
```

A example of build can be found here: [example](https://github.com/lucassabreu/twig-inject-svg/tree/master/example)