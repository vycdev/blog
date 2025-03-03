# Welcome 

Welcome to my blog. 

I'm still figuring out how to set Quartz so until then, you can enjoy this picture of a cat

![[image.png|250]]


Here is my publish script in powershell. Which I did not write using ChatGPT at all. Just as a way to test things.

I have another page called [[test]] filled with random stuff to test the functionality.

```powershell
# Get the directory of the script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envPath = Join-Path $scriptDir ".env"

# Load .env file
$envFile = Get-Content $envPath | ForEach-Object {
    $name, $value = $_ -split '=', 2
    Set-Variable -Name $name -Value $value
}

# Define variables from .env
$registry = $REGISTRY
$username = $USERNAME
$password = $PASSWORD
$imageName = $IMAGE_NAME
$tag = $IMAGE_TAG

# Echo variables
echo "Registry: $($registry)"
echo "Username: $($username)"
echo "Image Name: $($imageName)"
echo "Tag: $($tag)"

# Login to the Docker registry
docker login $registry -u $username -p $password

# Build the Docker image
docker build -t "$($imageName):$($tag)" .

# Tag the image for the registry
docker tag "$($imageName):$($tag)" "$($registry)/$($imageName):$($tag)"

# Push the image to the registry
docker push "$($registry)/$($imageName):$($tag)"

```


## Figuring out [Giscus](https://github.com/giscus/giscus)

I will not talk about how it took me 1 hour to figure out how to configure the themes. (The light theme was unusable, and the dark theme wasn't that good either)

This is the result: 

```ts
Component.Comments({
    provider: "giscus",
    options: {
    repo: "vycdev/blog",
    repoId: "R_kgDOOCiRuQ",
    category: "General",
    categoryId: "DIC_kwDOOCiRuc4Cnhmn",
    themeUrl: "https://giscus.app/themes",
    lightTheme: "catppuccin_latte",
    darkTheme: "catppuccin_mocha",
    },
})
```