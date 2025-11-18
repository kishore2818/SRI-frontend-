// import { mockTeam } from "@/lib/mockData";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export default function Teams() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Team Management</h1>
//         <p className="text-muted-foreground">Officers and operational personnel</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {mockTeam.map((member) => (
//           <Card key={member.id} className="glass-panel border-border p-6">
//             <div className="flex items-start gap-4">
//               <Avatar className="h-16 w-16">
//                 <AvatarImage src={member.avatar} alt={member.name} />
//                 <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//               </Avatar>
              
//               <div className="flex-1">
//                 <div className="flex items-start justify-between mb-2">
//                   <div>
//                     <h3 className="font-semibold text-foreground">{member.name}</h3>
//                     <p className="text-sm text-muted-foreground">{member.role}</p>
//                   </div>
//                   <Badge 
//                     className={`${
//                       member.status === 'active' 
//                         ? 'bg-tactical text-white' 
//                         : 'bg-muted text-foreground'
//                     } text-xs`}
//                   >
//                     {member.status.toUpperCase()}
//                   </Badge>
//                 </div>
                
//                 <div className="text-sm text-muted-foreground">
//                   <span className="font-medium text-foreground">{member.activeCases}</span> active cases
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }











import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone, MapPin, Shield, Award, Clock, Radio, Eye, Users, Target, Plane, Car, Laptop, Satellite, Map, X } from "lucide-react";
import { useState } from "react";

// NSG Group Data with contact information
const nsgGroups = [
  {
    id: "51-sag",
    name: "51 Special Action Group",
    code: "51 SAG",
    specialization: "Counter-Terrorism",
    description: "Primary counter-terrorism operations unit specializing in hostage rescue and terror neutralization",
    icon: Target,
    color: "border-red-500 border-l-4",
    missions: ["Hostage Rescue", "Building Clearance", "Terror Neutralization"],
    contact: "sag51.command@nsg.gov.in",
    phone: "+91-11-2671-5100",
    location: "New Delhi HQ",
    operatives: 120,
    activeMissions: 8,
    successRate: "99.2%"
  },
  {
    id: "52-sag",
    name: "52 Special Action Group",
    code: "52 SAG",
    specialization: "Anti-Hijack Operations",
    description: "Specialized in aircraft and vehicle hijack scenarios with rapid response capabilities",
    icon: Plane,
    color: "border-blue-500 border-l-4",
    missions: ["Aircraft Assault", "Vehicle Intervention", "Hostage Extraction"],
    contact: "sag52.command@nsg.gov.in",
    phone: "+91-11-2671-5200",
    location: "Indira Gandhi Airport",
    operatives: 85,
    activeMissions: 3,
    successRate: "98.7%"
  },
  {
    id: "11-srg",
    name: "11 Special Ranger Group",
    code: "11 SRG",
    specialization: "Counter-Terror & Logistics",
    description: "Ranger unit upgraded to counter-terror role with comprehensive logistics support",
    icon: Users,
    color: "border-green-500 border-l-4",
    missions: ["Perimeter Security", "Logistics Support", "Quick Response"],
    contact: "srg11.command@nsg.gov.in",
    phone: "+91-11-2671-1100",
    location: "Manesar Base",
    operatives: 150,
    activeMissions: 12,
    successRate: "97.9%"
  },
  {
    id: "13-srg",
    name: "13 Special Ranger Group",
    code: "13 SRG",
    specialization: "VIP Protection & Support",
    description: "Elite VIP security and specialized protective operations for high-profile targets",
    icon: Shield,
    color: "border-purple-500 border-l-4",
    missions: ["VIP Escort", "Event Security", "Protective Operations"],
    contact: "srg13.command@nsg.gov.in",
    phone: "+91-11-2671-1300",
    location: "Raisina Hills",
    operatives: 95,
    activeMissions: 15,
    successRate: "100%"
  },
  {
    id: "scg",
    name: "Special Composite Group",
    code: "SCG",
    specialization: "Regional Operations",
    description: "Regional NSG units providing rapid response across major Indian metropolitan hubs",
    icon: Map,
    color: "border-indigo-500 border-l-4",
    missions: ["Regional Response", "Quick Deployment", "Area Security"],
    contact: "scg.command@nsg.gov.in",
    phone: "+91-11-2671-7000",
    location: "National HQ",
    operatives: 280,
    activeMissions: 22,
    successRate: "98.5%"
  },
  {
    id: "esg",
    name: "Electronic Support Group",
    code: "ESG",
    specialization: "Technical & Communications",
    description: "Advanced technical, communications and electronic warfare support for all NSG operations",
    icon: Satellite,
    color: "border-gray-500 border-l-4",
    missions: ["Signal Intelligence", "Electronic Warfare", "Comm Support"],
    contact: "esg.command@nsg.gov.in",
    phone: "+91-11-2671-9000",
    location: "Electronic Warfare Center",
    operatives: 65,
    activeMissions: 18,
    successRate: "99.8%"
  }
];

// Regional SCG Units
const regionalUnits = [
  { id: "26-scg", name: "26 SCG Mumbai", location: "Mumbai", established: "2009", contact: "scg26.mumbai@nsg.gov.in" },
  { id: "27-scg", name: "27 SCG Chennai", location: "Chennai", established: "2010", contact: "scg27.chennai@nsg.gov.in" },
  { id: "28-scg", name: "28 SCG Hyderabad", location: "Hyderabad", established: "2011", contact: "scg28.hyderabad@nsg.gov.in" },
  { id: "29-scg", name: "29 SCG Kolkata", location: "Kolkata", established: "2012", contact: "scg29.kolkata@nsg.gov.in" },
  { id: "30-scg", name: "30 SCG Gujarat", location: "Gandhinagar", established: "2013", contact: "scg30.gujarat@nsg.gov.in" }
];

// Enhanced operatives data for each group
const generateOperatives = () => {
  const roles = ["Commander", "Team Leader", "Assault Specialist", "Sniper", "Demolition Expert", "Medic", "Tech Specialist"];
  const statuses = ["active", "on-mission", "training", "off-duty"];
  
  let operatives = [];
  nsgGroups.forEach(group => {
    for (let i = 0; i < group.operatives / 10; i++) {
      const role = roles[Math.floor(Math.random() * roles.length)];
      operatives.push({
        id: `${group.code}-${100 + i}`,
        name: `Commando ${group.code}-${100 + i}`,
        role: role,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        email: `operative${100 + i}@${group.contact.split('@')[1]}`,
        phone: `+91-${9000000000 + Math.floor(Math.random() * 100000000)}`,
        location: group.location,
        activeCases: Math.floor(Math.random() * 5),
        avatar: "",
        specialization: group.specialization,
        missionsCompleted: Math.floor(Math.random() * 50) + 10,
        skills: ["Advanced Combat", "Weapon Handling", "Tactical Movement"],
        group: group.code,
        groupName: group.name,
        groupColor: group.color
      });
    }
  });
  return operatives;
};

export default function Teams() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [newOperative, setNewOperative] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    specialization: "",
    group: "",
    status: "active",
    skills: ""
  });
  const operatives = generateOperatives();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'on-mission': return 'bg-orange-500 text-white';
      case 'off-duty': return 'bg-gray-500 text-white';
      case 'training': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    const roleLower = role?.toLowerCase() || '';
    switch (roleLower) {
      case 'commander': return 'from-red-500 to-orange-500';
      case 'team leader': return 'from-blue-500 to-cyan-500';
      case 'assault specialist': return 'from-purple-500 to-pink-500';
      case 'sniper': return 'from-green-500 to-emerald-500';
      case 'demolition expert': return 'from-yellow-500 to-amber-500';
      case 'medic': return 'from-indigo-500 to-blue-500';
      case 'tech specialist': return 'from-gray-500 to-slate-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getSpecializationIcon = (specialization: string = '') => {
    const specLower = specialization?.toLowerCase() || '';
    switch (specLower) {
      case 'counter terrorism': return '⚡';
      case 'anti-hijack': return '✈️';
      case 'vip protection': return '🛡️';
      case 'urban warfare': return '🏢';
      case 'reconnaissance': return '🔍';
      case 'explosive disposal': return '💣';
      case 'electronic warfare': return '📡';
      default: return '🎯';
    }
  };

  // Filter operatives based on selection
  const filteredOperatives = operatives.filter(operative => {
    const matchesGroup = selectedGroup === "all" || operative.group === selectedGroup;
    const matchesSearch = operative.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         operative.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         operative.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const handleDeployOperative = () => {
    // Handle adding new operative logic here
    console.log("Deploying new operative:", newOperative);
    setShowDeployModal(false);
    // Reset form
    setNewOperative({
      name: "",
      role: "",
      email: "",
      phone: "",
      location: "",
      specialization: "",
      group: "",
      status: "active",
      skills: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">National Security Guard</h1>
              <p className="text-muted-foreground">Black Cats Commando Force</p>
            </div>
          </div>
        </div>
        <Button 
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 gap-2"
          onClick={() => setShowDeployModal(true)}
        >
          <Plus className="h-4 w-4" />
          Deploy Operative
        </Button>
      </div>

      {/* Enhanced NSG Groups Overview with Border Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nsgGroups.map((group) => {
          const IconComponent = group.icon;
          const groupOperatives = operatives.filter(op => op.group === group.code);
          const activeOperatives = groupOperatives.filter(op => op.status === 'active' || op.status === 'on-mission').length;
          
          return (
            <Card 
              key={group.id}
              className={`glass-panel border-border ${group.color} overflow-hidden group hover:shadow-lg transition-all duration-300 ${
                selectedGroup === group.code ? 'ring-2 ring-orange-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedGroup(group.code)}
            >
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      group.id === "51-sag" ? "bg-red-500/20 text-red-500" :
                      group.id === "52-sag" ? "bg-blue-500/20 text-blue-500" :
                      group.id === "11-srg" ? "bg-green-500/20 text-green-500" :
                      group.id === "13-srg" ? "bg-purple-500/20 text-purple-500" :
                      group.id === "scg" ? "bg-indigo-500/20 text-indigo-500" :
                      "bg-gray-500/20 text-gray-500"
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{group.code}</h3>
                      <p className="text-muted-foreground text-sm">{group.name}</p>
                    </div>
                  </div>
                  <Badge className="bg-black/30 backdrop-blur-sm border-0">
                    {activeOperatives} Active
                  </Badge>
                </div>

                <p className="text-foreground text-sm">{group.description}</p>
                
                {/* Group Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted/30 rounded p-2">
                    <div className="font-bold text-foreground">{group.operatives}</div>
                    <div className="text-xs text-muted-foreground">Operatives</div>
                  </div>
                  <div className="bg-muted/30 rounded p-2">
                    <div className="font-bold text-foreground">{group.activeMissions}</div>
                    <div className="text-xs text-muted-foreground">Active Ops</div>
                  </div>
                  <div className="bg-muted/30 rounded p-2">
                    <div className="font-bold text-foreground">{group.successRate}</div>
                    <div className="text-xs text-muted-foreground">Success</div>
                  </div>
                </div>

                {/* Missions */}
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">Specialized Missions</h4>
                  <div className="flex flex-wrap gap-1">
                    {group.missions.map((mission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {mission}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">Command Contact</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-foreground">{group.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-foreground">{group.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGroup(group.code);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Regional Units with Contact */}
      <Card className="glass-panel border-border border-l-4 border-indigo-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Map className="h-5 w-5 text-indigo-500" />
              Regional Composite Groups
            </h3>
            <Badge variant="outline">5 Regional Hubs</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {regionalUnits.map((unit) => (
              <Card key={unit.id} className="glass-panel border-border p-4 hover:shadow-md transition-all">
                <div className="text-center">
                  <div className="font-semibold text-foreground text-sm mb-1">{unit.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{unit.location}</div>
                  <div className="flex items-center gap-1 justify-center text-xs text-muted-foreground mb-3">
                    <Mail className="h-3 w-3" />
                    {unit.contact}
                  </div>
                  <Badge variant="outline" className="text-xs">Est. {unit.established}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      {selectedGroup !== "all" && (
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={`Search ${nsgGroups.find(g => g.code === selectedGroup)?.name} operatives...`}
              className="pl-10 glass-panel border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline"
            onClick={() => {
              setSelectedGroup("all");
              setSearchQuery("");
            }}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            All Groups
          </Button>
        </div>
      )}

      {/* Operatives Grid */}
      {selectedGroup !== "all" && filteredOperatives.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-foreground">
              {nsgGroups.find(g => g.code === selectedGroup)?.name} Operatives
            </h3>
            <Badge variant="outline">
              {filteredOperatives.length} Operatives
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOperatives.map((operative) => (
              <Card 
                key={operative.id} 
                className="glass-panel border-border overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${getRoleColor(operative.role)} p-4 relative`}>
                  <div className="absolute top-4 right-4 flex flex-col gap-1">
                    <Badge className="bg-black/30 text-white backdrop-blur-sm border-0 text-xs">
                      {operative.group}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white/20 shadow-lg">
                      <AvatarImage src={operative.avatar} alt={operative.name} />
                      <AvatarFallback className="bg-white/20 text-white font-bold text-sm">
                        {operative.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-white">
                      <h3 className="font-bold text-md">{operative.name}</h3>
                      <p className="text-white/80 text-xs">{operative.role}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(operative.status)}>
                      {operative.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="text-sm">{getSpecializationIcon(operative.specialization)}</span>
                      {operative.specialization}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-muted/30 rounded p-2">
                      <div className="font-bold text-foreground">{operative.activeCases}</div>
                      <div className="text-xs text-muted-foreground">Active Ops</div>
                    </div>
                    <div className="bg-muted/30 rounded p-2">
                      <div className="font-bold text-foreground">{operative.missionsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Missions</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" className="flex-1 text-xs bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                      <Eye className="h-3 w-3 mr-1" />
                      Deploy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <Card className="glass-panel border-border border-l-4 border-orange-500">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Readiness</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">QRT</div>
              <div className="text-sm text-muted-foreground">Quick Response</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">NSG</div>
              <div className="text-sm text-muted-foreground">Standards</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">Elite</div>
              <div className="text-sm text-muted-foreground">Training</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deploy Operative Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Deploy New Operative</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeployModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input 
                      placeholder="e.g., John Carter" 
                      value={newOperative.name}
                      onChange={(e) => setNewOperative({...newOperative, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role *</label>
                    <Input 
                      placeholder="e.g., Assault Specialist" 
                      value={newOperative.role}
                      onChange={(e) => setNewOperative({...newOperative, role: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input 
                      placeholder="operative@nsg.gov.in" 
                      type="email"
                      value={newOperative.email}
                      onChange={(e) => setNewOperative({...newOperative, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone *</label>
                    <Input 
                      placeholder="+91-XXXXXXXXXX" 
                      value={newOperative.phone}
                      onChange={(e) => setNewOperative({...newOperative, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location *</label>
                    <Input 
                      placeholder="e.g., New Delhi HQ" 
                      value={newOperative.location}
                      onChange={(e) => setNewOperative({...newOperative, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialization *</label>
                    <Input 
                      placeholder="e.g., Counter Terrorism" 
                      value={newOperative.specialization}
                      onChange={(e) => setNewOperative({...newOperative, specialization: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">NSG Group *</label>
                    <select 
                      className="w-full p-2 border border-border rounded-lg bg-background"
                      value={newOperative.group}
                      onChange={(e) => setNewOperative({...newOperative, group: e.target.value})}
                    >
                      <option value="">Select NSG Group</option>
                      <option value="51 SAG">51 SAG - Counter Terrorism</option>
                      <option value="52 SAG">52 SAG - Anti-Hijack</option>
                      <option value="11 SRG">11 SRG - Counter Terror & Logistics</option>
                      <option value="13 SRG">13 SRG - VIP Protection</option>
                      <option value="SCG">SCG - Regional Operations</option>
                      <option value="ESG">ESG - Electronic Support</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status *</label>
                    <select 
                      className="w-full p-2 border border-border rounded-lg bg-background"
                      value={newOperative.status}
                      onChange={(e) => setNewOperative({...newOperative, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="training">Training</option>
                      <option value="off-duty">Off Duty</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills & Qualifications</label>
                  <Input 
                    placeholder="e.g., Advanced Combat, Weapon Handling, Tactical Movement"
                    value={newOperative.skills}
                    onChange={(e) => setNewOperative({...newOperative, skills: e.target.value})}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowDeployModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    onClick={handleDeployOperative}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Deploy Operative
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}