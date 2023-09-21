#### project repo : https://github.com/phbru/polyjam-station

## Easy usage...

Open a powershell terminal at the root of the project (right-click "open in terminal")
write the following :

```
> git pull
> npm install
> npm run dev
```

## Using git...

1. Open a git shell where you want to clone the repo
2. Clone the repo (first time use only): `git clone https://github.com/phbru/polyjam-station`
3. Pull the latest changes : `git pull`

## Requirements

- Install Node: https://nodejs.org/en/download ( juste pèse sur le carré "Windows Installer" et lance le fichier qui se télécharge)
- Install git : https://git-scm.com/download/win

## Prepare data

#### There are two data files to place in the project.

> Place them in the /data folder at the root of the project

- Both must respect the following names - dispos.csv : gives the unavailabilities of people - songs.csv : gives the current repertoire
- Both are csv files and should be formatted in such a way that first row and first column are headers.
  > i.e. the data itself start on row 2 and column 2 and _there is no extra lines and columns at the start of the file_
  > Example :

```
                 columnName1  columnName2         ...
rowName1          data11          data12          ...
rowName2          data21          data22          ...
...
```

## Launch app

- Open terminal in project folder
- Write the following command

```
npm install
```

```
npm run dev
```

## Possible Features Ahead

[ ] Select multiple songs
[ ] Better UI
[ ] Don't show instruments with no one
[ ] Box stuff together
[ ] Musicians are collapsible
[ ] Date picker for the SelectDateSection
[ ] Drag and drop data files in the web page
