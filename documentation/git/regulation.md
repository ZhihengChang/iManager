# Git Regulation

This doc contains:

- Basic Git Operation
- Making Changes to The Project
- Commit Message Format
- Commit to Master

### Basic Git Operation
To check status:                    
```git status```                    <br>
To save specific changes locally using:
```git add [file path]```           <br>
To save all changes locally using:  
```git add .```                     <br>
To commit changes using:            
```git commit -m"[message]"```      <br>
To push changes to remote using:    
```git push```                      <br>
To pull changes from remote using:  
```git pull```                      <br>

### Making Changes to The Project
When making changes to the project, a new branch with the task/story name should be created using git command: <br>
```git branch [branch name]```          <br>
Then switch to the new branch using:    <br>
```git checkout [branch name]```        <br>
Make sure to commit changes before switching branches. <br>
Make sure to commit often. <br>
***NOTE:*** <br>
To delete a branch locally: 
```git branch -d [local Branch Name]``` <br>
To delete branch remotely:
```git push origin --delete [remote Branch Name]```

### Commit Message Format
All Commit Message should be in the following format: <br>
```git commit -m "[branch name]:[member name] [work details]"``` <br>
***NOTE:*** Member name should be the prefix before ```@wit.edu```. <br>
For Example: <br>
```git commit -m "updateHomePage: changz Add home page button animation"```

### Commit to Master
All the changes commiting to master from task branch should create a pull request in the following format: <br>
```[branch name] -> master [changes]``` <br>
Copy the pull request URL and post it to discord ```#pull request``` channel. <br>
How to request for pull request review: [Request PR Review](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/requesting-a-pull-request-review)<br>
