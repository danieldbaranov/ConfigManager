
$jsonContent = Get-Content -Raw -Path "data.json"
$data = $jsonContent | ConvertFrom-Json






# Clear the screen
Clear-Host

# Define the text to be centered
$text = $data.Count

# Get the dimensions of the console window
$screenWidth = [Console]::WindowWidth
$screenHeight = [Console]::WindowHeight

# Calculate the position to center the text horizontally
$middleX = [math]::Ceiling(($screenWidth - $text.Length) / 2)

# Calculate the position to center the text vertically
$middleY = [math]::Ceiling($screenHeight / 2)

# Position the cursor at the calculated coordinates
[Console]::SetCursorPosition($middleX, $middleY)

# Display the centered text
Write-Host $text

# Wait for user input
Read-Host "Press Enter to continue..."

Clear-Host
