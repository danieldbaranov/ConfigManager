#!/bin/bash

# Define the paths to the Neovim config folder in Linux and the script's directory
linux_neovim_config_path="$HOME/.config/nvim"
script_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )/configs" && pwd )"

# Define the name of the Neovim config folder
neovim_config_folder_name="nvim"

# Copy the Neovim config folder from Linux to the script's directory
copy_linux_to_script() {
    if [ -d "$linux_neovim_config_path" ]; then
        cp -r "$linux_neovim_config_path" "$script_directory"
        echo "Neovim config folder copied from Linux to script's directory."
    else
        echo "Linux Neovim config folder not found at: $linux_neovim_config_path"
    fi
}

# Copy the Neovim config folder from the script's directory to Linux
copy_script_to_linux() {
    if [ -d "$script_directory/$neovim_config_folder_name" ]; then
        mkdir -p "$linux_neovim_config_path"
        cp -r "$script_directory/$neovim_config_folder_name" "$linux_neovim_config_path"
        echo "Neovim config folder copied from script's directory to Linux."
    else
        echo "Script Neovim config folder not found at: $script_directory/$neovim_config_folder_name"
    fi
}

# Check for command-line arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [linux-to-script | script-to-linux]"
    exit 1
fi

# Determine the action based on the command-line argument
case "$1" in
    linux-to-script)
        copy_linux_to_script
        ;;
    script-to-linux)
        copy_script_to_linux
        ;;
    *)
        echo "Invalid argument. Use 'linux-to-script' or 'script-to-linux'."
        exit 1
        ;;
esac

