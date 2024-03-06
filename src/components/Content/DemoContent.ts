export const DemoContent = `<div><external-content-component title="Title" content="The GNOME 42 release is much bigger than the base Forty series"><p>Hi</p></external-content-component><external-content-component title="Description" content="The GNOME 42 release is much bigger than the base Forty series. The changes are significant in terms of the future of GNOME as a desktop. Changes are spread across GNOME Shell, Mutter, native applications and core libraries."><p>Hi</p></external-content-component>\n<p><strong>We give you all the important GNOME 42 feature highlights and release information in this article. Read on.</strong></p>\n<p>The GNOME 42 release is much bigger than the base Forty series. The changes are significant in terms of the future of GNOME as a desktop. Changes are spread across GNOME Shell, Mutter, native applications and core libraries. </p>\n<p>With that in mind, here’s a summary of the important features of GNOME 42.</p>\n<div>\n<ul><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#GNOME_42_Schedule" title="GNOME 42 Schedule">GNOME 42 Schedule</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#GNOME_42_Feature" title="GNOME 42 Feature">GNOME 42 Feature</a><ul><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Work_on_the_libadwaita" title="Work on the libadwaita">Work on the libadwaita</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#System-wide_Dark_Theme" title="System-wide Dark Theme">System-wide Dark Theme</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Rate_of_Input_Events_in_Mutter" title="Rate of Input Events in Mutter">Rate of Input Events in Mutter</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#New_Screenshot_UI_of_Shell" title="New Screenshot UI of Shell">New Screenshot UI of Shell</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#GNOME_Control_Center" title="GNOME Control Center">GNOME Control Center</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Software" title="Software">Software</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Adwaita_Theme" title="Adwaita Theme">Adwaita Theme</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Files" title="Files">Files</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#New_Text_Editor" title="New Text Editor">New Text Editor</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#New_Default_Wallpaper" title="New Default Wallpaper">New Default Wallpaper</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Other_Improvements" title="Other Improvements">Other Improvements</a></li></ul></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Download" title="Download ">Download </a><ul><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Sample_Commands_to_setup_GNOME_Nightly" title="Sample Commands to setup GNOME Nightly">Sample Commands to setup GNOME Nightly</a></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Availability_in_Linux_Distributions" title="Availability in Linux Distributions">Availability in Linux Distributions</a></li></ul></li><li><a target="_blank" href="https://www.debugpoint.com/gnome-42/#Closing_Notes" title="Closing Notes">Closing Notes</a></li></ul></div>\n<h2><span></span>GNOME 42 Schedule<span></span></h2>\n<p><strong>GNOME 42 was released on March 23, 2022</strong>. Here’s a tentative schedule.</p>\n<ul><li>Alpha: January 8, 2022</li><li>Beta (UI Freeze): February 23, 2022</li><li>Release Candidate (Code Freeze): March 5, 2022</li><li><a href="https://release.gnome.org/42/" target="_blank">Final Release: March 23, 2022</a></li></ul>\n<h3><span></span>Work on the libadwaita<span></span></h3>\n<p>The major porting work for <a href="https://gitlab.gnome.org/GNOME/libadwaita" target="_blank">libadwaita</a> already started since <a href="https://www.debugpoint.com/tag/gnome-41" target="_blank">GNOME 41</a> release, and it continued in this release as well. A major milestone release, libadwaita 1.0 is due by the end of 2021. So, it is expected that the libadwaita 1.0 release soon be included in GNOME 42 with exciting UI changes.</p>\n<p>The most important change of this release is porting of all core apps and dialogs to the libadwaita library, which is the modern building block for GTK4 applications.</p>\n<p>It is difficult to demonstrate individual libadwaita improvements because they are incorporated in every corner of GNOME desktop. In general, you would see flat buttons, nice drop-downs, page animations, toast messages among the few changes of libadwaita. </p>\n<p>If you want to take a look, there is a nice little libadwaita demo application that contains a demonstration of how the various component looks such as Tabs, Buttons, Lists, etc. You can try this out as a Flatpak app from GNOME Nightly (instructions are at the end of this page).</p>\n<h3><span></span>System-wide Dark Theme<span></span></h3>\n<p>This release introduces <a href="https://gitlab.gnome.org/GNOME/Initiatives/-/issues/32" target="_blank">system-wide dark style preferences</a> as the most visible GNOME 42 feature. That means, you would have a settings switch, when turned on, the entire desktop and applications that support dark theme would automatically change to dark style.</p>\n<p>So, the native applications require additional changes to honour these system-wide dark preferences.</p>\n<p>If an application doesn’t have native dark preferences, will be dark when this is enabled.</p>\n<p>Content-based applications such as Files, Maps, Text Editor follow this preference when possible.</p>\n<div><figure><img src="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Appearance-Page-in-Settings-showing-the-Light-and-Dark-Switch.jpg" alt="GNOME 42 - Appearance Page in Settings showing the Light and Dark Switch" srcset="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Appearance-Page-in-Settings-showing-the-Light-and-Dark-Switch.jpg 886w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Appearance-Page-in-Settings-showing-the-Light-and-Dark-Switch-300x228.jpg 300w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Appearance-Page-in-Settings-showing-the-Light-and-Dark-Switch-768x584.jpg 768w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Appearance-Page-in-Settings-showing-the-Light-and-Dark-Switch-360x274.jpg 360w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Appearance-Page-in-Settings-showing-the-Light-and-Dark-Switch-545x415.jpg 545w" /><figcaption>GNOME 42 – Appearance Page in Settings showing the Light and Dark Switch</figcaption></figure></div>\n<h3><span></span>Rate of Input Events in Mutter<span></span></h3>\n<p>Mutter now sends input events at the device rate to applications. This should significantly increase perceived responsiveness for games and artistic applications. You can read more <a href="https://blogs.gnome.org/shell-dev/2021/12/08/an-eventful-instant/" target="_blank">here</a>.</p>\n<h3><span></span>New Screenshot UI of Shell<span></span></h3>\n<p>The new <a href="https://gitlab.gnome.org/GNOME/gnome-shell/-/merge_requests/1954" target="_blank">screenshot UI</a> of the GNOME Shell, which was part of Google Summer of Code 2021, brought more features and made it a complete native screenshot and screencasting tool for GNOME. The work for making it a complete app may not finish by GNOME 42 release. But, the majority of the screenshot and screen record functionalities are already merged.</p>\n<p>Some of the features that are expected in release 42 and which I feel the important ones from the usability perspective.</p>\n<ul><li>Direct saving of screenshots as file</li><li>They are also added automatically in the recent files</li><li>Asynchronous PNG compression for faster workflow while taking multiple screenshots</li><li>Click on notification to open image</li></ul>\n<div><figure><img src="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Screenshot-UI.jpg" alt="GNOME Screenshot UI" srcset="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Screenshot-UI.jpg 790w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Screenshot-UI-300x204.jpg 300w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Screenshot-UI-768x523.jpg 768w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Screenshot-UI-360x245.jpg 360w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Screenshot-UI-545x371.jpg 545w" /><figcaption>GNOME Screenshot UI</figcaption></figure></div>\n<h3><span></span>GNOME Control Center<span></span></h3>\n<p>In GNOME 42, the entire Settings and its components are ported to GTK4. It is a huge change considering 30+ modules in Gnome Control Center. Functionality wise, you may not see any differences between GTK3 and GTK4 in settings. But obvious UI differences are noticeable.</p>\n<p>Other changes mostly include bug fixes and code cleanups.</p>\n<div><figure><img src="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Settings-Window-1024x725.jpg" alt="GNOME 42 - Settings Window" srcset="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Settings-Window-1024x725.jpg 1024w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Settings-Window-300x212.jpg 300w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Settings-Window-768x544.jpg 768w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Settings-Window-360x255.jpg 360w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Settings-Window-545x386.jpg 545w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-Settings-Window.jpg 1206w" /><figcaption>GNOME 42 – Settings Window</figcaption></figure></div>\n<h3><span></span>Software<span></span></h3>\n<p>GNOME Software perhaps contains more merge requests in GNOME 42. Most of them are minor tweaks, bug fixes, UI design changes in several pages of Software due to GTK4 and libadwaita port.</p>\n<h3><span></span>Adwaita Theme<span></span></h3>\n<p>The default Adwaita theme’s folder icon colour gets a revamp. They are now in Blue with a white gradient. A couple of days back it was proposed as a blue with green gradient, which looked terrible anyway. So it was dropped. As of writing this post, it is still in progress and likely to complete in the coming days.</p>\n<div><figure><img src="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-1024x538.jpg" alt="GNOME 42 - New color in default Adwaita Theme" srcset="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-1024x538.jpg 1024w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-300x157.jpg 300w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-768x403.jpg 768w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-1536x806.jpg 1536w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-360x189.jpg 360w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-545x286.jpg 545w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme-1600x840.jpg 1600w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-42-New-color-in-default-Adwaita-Theme.jpg 1903w" /><figcaption>GNOME 42 – New color in default Adwaita Theme</figcaption></figure></div>\n<h3><span></span>Files<span></span></h3>\n<p>Apart from the obvious looks change for libadwaita, Files (aka Nautilus) is <a href="https://gitlab.gnome.org/GNOME/nautilus/-/issues/1986" target="_blank">revamping</a> the rename popup dialog with auto-expanding file name text box.</p>\n<h3><span></span>New Text Editor<span></span></h3>\n<p>The default text editor <a href="https://www.debugpoint.com/2021/04/gedit-features/" target="_blank">Gedit</a> is expected to be replaced by a new editor called GNOME Text Editor. The new editor looks really nice and loaded with features. It is developed from scratch and well suited for libadwaita UI design principles. On the feature side, it has built-in themes for writing, coding and all the standard features of a text editor. You can read about it in detail in our exclusive write up here: <a target="_blank" href="https://www.debugpoint.com/2021/12/gnome-text-editor/">Everything you need to know about GNOME Text Editor</a>.</p>\n<div><figure><img src="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Text-Editor-1024x576.jpg" alt="GNOME Text Editor" srcset="https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Text-Editor-1024x576.jpg 1024w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Text-Editor-300x169.jpg 300w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Text-Editor-768x432.jpg 768w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Text-Editor-360x203.jpg 360w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Text-Editor-545x307.jpg 545w, https://www.debugpoint.com/wp-content/uploads/2021/12/GNOME-Text-Editor.jpg 1200w" /><figcaption>GNOME Text Editor</figcaption></figure></div>\n<h3><span></span>New Default Wallpaper<span></span></h3>\n<p>In each release of GNOME, we get a new default wallpaper with day, night variants for Adwaita. New wallpaper and its variants are expected as well in GNOME 42. This is how it looks as of now (may change in the final release). Via <a href="https://gitlab.gnome.org/GNOME/gnome-backgrounds/-/commits/main" target="_blank">source</a>.</p>\n<div><figure><img src="https://www.debugpoint.com/wp-content/uploads/2021/12/Possible-new-default-adwaita-wallpaper-for-GNOME-42.jpg" alt="Possible new default adwaita wallpaper for GNOME 42" srcset="https://www.debugpoint.com/wp-content/uploads/2021/12/Possible-new-default-adwaita-wallpaper-for-GNOME-42.jpg 644w, https://www.debugpoint.com/wp-content/uploads/2021/12/Possible-new-default-adwaita-wallpaper-for-GNOME-42-275x300.jpg 275w, https://www.debugpoint.com/wp-content/uploads/2021/12/Possible-new-default-adwaita-wallpaper-for-GNOME-42-360x393.jpg 360w, https://www.debugpoint.com/wp-content/uploads/2021/12/Possible-new-default-adwaita-wallpaper-for-GNOME-42-545x595.jpg 545w" /><figcaption>Possible new default adwaita wallpaper for GNOME 42</figcaption></figure></div>\n<h3><span></span>Other Improvements<span></span></h3>\n<p>So, the above items are the most visible changes. But there are a huge list of bug fixes, performance improvements, code cleanups and Wayland updates landing in GNOME Shell and Mutter plus in the code applications. They are definitely making up to be a well-optimized and bug-free GNOME desktop.  </p>\n<h2><span></span>Download <span></span></h2>\n<p>You can download the official GNOME OS which features GNOME 42 out of the box. You can download the ISO from the below link and try in <a href="https://www.debugpoint.com/2020/05/install-use-gnome-boxes/" target="_blank">GNOME Boxes</a> virtual machine. </p>\n<p><a target="_blank" href="https://download.gnome.org/gnomeos/42.0/gnome_os_installer_42.0.iso">https://download.gnome.org/gnomeos/42.0/gnome_os_installer_42.0.iso</a></p>\n<p><a target="_blank" href="https://www.debugpoint.com/2022/02/fedora-36/">Fedora 36</a> and <a target="_blank" href="https://www.debugpoint.com/2022/01/ubuntu-22-04-lts/">Ubuntu 22.04 LTS</a> is expected to feature GNOME 42 when released. </p>\n<h3><span></span>Sample Commands to setup GNOME Nightly<span></span></h3>\n<ul><li>Setup <a href="https://wiki.gnome.org/Apps/Nightly" target="_blank">GNOME Nightly Flatpak</a> repo</li></ul>\n<pre>flatpak remote-add --if-not-exists gnome-nightly https://nightly.gnome.org/gnome-nightly.flatpakrepo</pre>\n<ul><li>List out the available nightly apps</li></ul>\n<pre>flatpak remote-ls --app gnome-nightly</pre>\n<ul><li>Install a nightly app (example Adwaita Demo) from above list</li></ul>\n<pre>flatpak install gnome-nightly org.gnome.Adwaita1.Demo</pre>\n<ul><li>Run a nightly app (example TextEditor)</li></ul>\n<pre>flatpak run org.gnome.Adwaita1.Demo//master</pre>\n<h3><span></span>Availability in Linux Distributions<span></span></h3>\n<p>GNOME 42 is expected to be featured in Ubuntu 22.04 LTS Jammy Jellyfish in 2022 and in Fedora 36 due in 2022.</p>\n<h2><span></span>Closing Notes<span></span></h2>\n<p>GNOME 42 is shaping up to be another huge release of GNOME History. I personally think it’s going to be bigger than GNOME 40. The libadwaita port was a long due, and it’s going to be completed, well almost. Such an impactful release from the GNOME team, and definitely would be well accepted across its user base. </p>\n<p>So, w<strong>hat do you think about this release and the GNOME 42 feature? Anything you were expecting as a feature? Let me know in the comment box below.</strong></p>\n<p><em><span>Some image credit: GNOME Team</span></em></p>\n<p><em><span>References used for this post</span></em></p>\n<ul><li><em><a target="_blank" href="https://adrienplazas.com/blog/2021/03/31/introducing-libadwaita.html">https://adrienplazas.com/blog/2021/03/31/introducing-libadwaita.html</a></em></li><li><em><a target="_blank" href="https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/3079">https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/3079</a></em></li><li><em><a target="_blank" href="https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/3079">https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/3079</a></em></li><li><em><a target="_blank" href="https://gitlab.gnome.org/GNOME/gtk/-/issues/3582">https://gitlab.gnome.org/GNOME/gtk/-/issues/3582</a></em></li><li><em><a target="_blank" href="https://gitlab.gnome.org/GNOME/Initiatives/-/wikis/Dark-Style-Preference">https://gitlab.gnome.org/GNOME/Initiatives/-/wikis/Dark-Style-Preference</a></em></li><li><em><a target="_blank" href="https://gitlab.gnome.org/GNOME/Initiatives/-/issues/32">https://gitlab.gnome.org/GNOME/Initiatives/-/issues/32</a></em></li></ul>\n</div>`