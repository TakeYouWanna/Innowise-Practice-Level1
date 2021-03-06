# InnowisePracticeLevel1

[TASK](https://docs.google.com/document/d/1heFuihWrsw14bCpUdr6fla9ysqE6IrsobSMKAOpBiKA/edit)


# DEMO  

[Demo version of the project](http://takeyouwanna.github.io/)


# How to run the app

1. Clone this repository
```
$ git clone https://github.com/TakeYouWanna/Innowise-Practice-Level1
```
    
2. Open the directory in VSCode

3. Open a terminal in VSCode and install the NPM module
```
$ npm install
```
4. Run the application with the command
```
$ ng serve --open
```

# FOLDERS STRUCTURE

```
└──src   
    └──app 
        ├──modules                                          
                ├──auth                                  
                    ├──login-window                         #component for authorization
                    ├──registr-window                       #component for registration
                    ├──auth-routing.module.ts               #routing for auth
                    └──auth.module.ts                       #auth module

                └──organizer
                    ├──calendar                             #component for calendar and task-list
                    ├──task-manager                         #component for adding and editing a task
                    ├──organizer-routing.module.ts          #routing for organizer
                    └──organizer.module.ts                  #organizer module
                    
        └──shared 
                ├──interfaces                               #interfaces for the program
                ├──services                             
                    ├──data                                 #services for storing and processing data
                    ├──date                                 #service for working with dates
                    └──firebase                             #services for working with firestore
                    
                └──top-bar                                  #top-bar component
        
    ├──enviroments                               #contains information about firebase server
    ├──images                                    #contains images for program
    └──index.scss                                
        
```


# FIRESTORE STRUCTURE

```
    └──Users                                        #main collection for users
          └──UserId                                 #user id
                  └──Tasks                          #collection of tasks for a specific user
                        └──TasksId                  #task id
                                ├──name             #task name (string)
                                ├──description      #task description (string)
                                ├──status           #task status (true/false)
                                └──date             #task date (date)

```

# APPLICATION STACK  
#### used libraries
## RxJS
#### used for processing and storing data
## Date-fns
#### used to work with dates



