# Speed at Impact [Calculater](https://github.com/Robbie219/CIM540/blob/master/week%203/Calculator/speedatimpact.html)

This program is a calculator where the user enters a height, in feet, from which an object is to be dropped and the calculator returns the speed in, miles per hour, that the object will reach when it hits the ground.

- inputs
- capture height
- output
- message telling user result

I need the user to give the height that the object will be dropped from. I'll use a text input for this. The user will have to click on a button to submit their height. I'll use a button and it will activate my calculation function. My function will get the value of the form input. I'll grab the number, multiply it by .3048 to convert it to meters, put it into the formula squareroot(2*9.8*height), then convert the answer to miles per hour by multiplying by 2.23694. This will give the answer in miles per hour, which I will return to the user in a message.