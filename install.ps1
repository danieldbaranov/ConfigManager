
$jsonContent = Get-Content -Raw -Path "data.json"
$data = $jsonContent | ConvertFrom-Json


# Define ANSI escape codes for color
$red = [ConsoleColor]::Red
$reset = [ConsoleColor]::Gray

function print {
	param(
		[string]$text,
		[int]$selected
	)
	if($selected -eq 1){
		Write-Host -ForegroundColor $red $text	
	} else {
		Write-Host $text
	}
	Write-Host
}

# Clear the screen
Clear-Host

# Get the dimensions of the console window
$screenWidth = [Console]::WindowWidth
$screenHeight = [Console]::WindowHeight

# Calculate the position to center the text horizontally
$middleX = [math]::Ceiling(($screenWidth - $text.Length) / 2)

# Calculate the position to center the text vertically
$middleY = [math]::Ceiling($screenHeight / 2)

# Position the cursor at the calculated coordinates
[Console]::SetCursorPosition($middleX, $middleY)
$input = '0'
$data[0].selected = 1
while($true){
	clear
	$middleY = [math]::Ceiling($screenHeight / 2)
	foreach ($item in $data){
		[Console]::SetCursorPosition($middleX, $middleY)
		print -text item.name -selected $item.selected
		$middleY++
	}
	# Wait for user input
	$input = [System.Console]::ReadKey() # "Press Enter to continue..."

	if($input.KeyChar -eq 'q'){
		break
	}

}
Clear-Host
