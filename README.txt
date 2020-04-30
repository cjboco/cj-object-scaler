CJ Object Scaler jQuery Plugin

Copyright (c) 2011 Creative Juices Bo. Co.
Written by: Doug Jones (www.cjboco.com)
Licensed under the MIT.

A JQuery Plug-In to Scale Objects to Fit or Fill Within Another Object



CJ Object Scaler

A JQuery Plug-In to Scale Objects to Fit or Fill Within Another Object.
CJ Image Scaler will scale an object to fit or fill within a destination object.

You have two scaling methods to choose from:

Scale To Fit (fit) - This method will scale the object image to fit the destination object.
Scale To Fill (fill) - This method will scale the source object to completely fill the destination object.

You also have the option to hide the object prior to calculating the scale amount and
performing a fade in once the object has been scaled.

Take a look at the source code for a better look at what's going on. If you need further
explanation of how this plug-in scales things, shoot me a message!

User Options
You have a few options that you can pass to the plug-in. These change basic functionality and are listed below:

Argument        Description                                                     Default
--------------------------------------------------------------------------------------------
method         The scaling method to use, "fit" or "fill".                      fit
               You may also use classNames to invoke the
               scaling method as well. The object being
               scaled can have the following classes:
                 cj_image_scale_fill
                 cj_image_scale_fit
               (Classes overide method option.)
fade           Amount of millisecond to fade in the image                       0
               after scale is complete.
width          [optional] The amount to scale the width to.                     null
               If not provided, will use destElem or
               parent width.
height         [optional] The amount to scale the height to.                    null
               If not provided, will use destElem or
               parent height.
destElem       [optional The object to scale into. If not                       null
               providede, will use parent.
callback       [optional] You can provide a function to be                      null
               called after the scaling is complete.


Classes
You have a few classes that you can use with the plug-in. These effect scaling method to apply

Class                    Description
----------------------------------------------------------------------------------------------------
cj_image_scale_fill      This class will scale the source object to completely fill the destination object.

cj_image_scale_fit       This class will scale the object image to fit the destination object.
