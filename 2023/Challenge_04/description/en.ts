const description = `**Hackers damage file system**
In a world where information is power, a hacker known as Savipo Yatar discovers a series of files on a highly protected server.

These files contain secrets that could change the course of history. But there's a problem: some of the files are fake, designed to trick intruders. Savipo Yatar must quickly determine which files are real and which are fake.

Each file has a name with two parts, separated by a hyphen (-). The first part is an alphanumeric string and the second is a checksum, which is a string made up of characters that only appear once in the first part and in the order in which they appear.

He writes a program that determines whether a file is real or fake based on these rules.

Examples:

File name: xyzz33-xy
Result: ✅ Real (The checksum is valid)

File name: abcca1-ab1
Result: ❌ False (The checksum should be b1, it is incorrect)

File name: abbc11-ca
Result: ❌ False (The checksum should be ac, the order is incorrect)
Each line indicates the name of the file and its corresponding checksum, separated by a hyphen (-).

**How to solve it**
1. Analyze the list of file names and their checksums that you will find in this file: https://codember.dev/data/files_quarantine.txt

2. Find the 33rd real file (of all the real files, the 33rd in order of appearance) and send its checksum with submit. For example if the file is xyzz33-xy, you would do:
submit xy`
export default description
