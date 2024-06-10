import os

def rename_files(directory):
    for filename in os.listdir(directory):
        if os.path.isfile(os.path.join(directory, filename)):
            new_filename = filename.lower().replace(" ", "-")
            os.rename(os.path.join(directory, filename), os.path.join(directory, new_filename))

# Example usage
directory = input("Enter the directory path: ")
rename_files(directory)