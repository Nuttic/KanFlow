import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { User, Mail, Briefcase, Camera, Lock, LogOut, Save } from 'lucide-react';
import {useAuthStore} from '@/store/AuthStore';

function ProfilePage() {
  const navigate = useNavigate();
  const {logOut} = useAuthStore()
  const [isDark, setIsDark] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'Product Manager',
    bio: 'Passionate about building products that make a difference. 5+ years of experience in product management.',
    avatar: 'https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3MzcyNjcxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Mock save - in real app, this would update the backend
    setIsEditing(false);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password change - in real app, this would update the backend
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleLogout = () => {
    logOut()
    navigate('/signin')
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar isDark={isDark} onThemeToggle={toggleTheme} />
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-foreground">Profile Settings</h1>

            {/* Profile Information Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-foreground">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm border border-border/50 rounded-lg hover:bg-muted/30 transition-colors text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                )}
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border/50">
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <h4 className="text-foreground mb-1">{profileData.name}</h4>
                  <p className="text-sm text-muted-foreground">{profileData.role}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-foreground">Role / Position</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-foreground">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-foreground mb-6">Change Password</h3>
              
              <form onSubmit={handleSavePassword} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-foreground">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      placeholder="Enter current password"
                      className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-foreground">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-foreground">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Preferences Card */}
            {/* <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-foreground mb-6">Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates about your tasks</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground">Task Reminders</p>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming deadlines</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground">Weekly Summary</p>
                    <p className="text-sm text-muted-foreground">Receive weekly progress reports</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div> */}

            {/* Danger Zone */}
            <div className="bg-card border border-destructive/20 rounded-2xl p-6 shadow-sm">
              <h3 className="text-foreground mb-4">Account Actions</h3>
              
              <button
               onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <LogOut 
                className="w-5 h-5"
                />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default ProfilePage