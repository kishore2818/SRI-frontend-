import { mockEvidence } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Download, FolderPlus, Play } from "lucide-react";

export default function LiveEvidence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Evidence Storage</h1>
        <p className="text-muted-foreground">Archived detection clips and recordings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEvidence.map((item) => (
          <Card key={item.id} className="glass-panel border-border overflow-hidden group">
            <div className="relative aspect-video bg-muted">
              <img 
                src={item.thumbnail}
                alt={item.type}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm">
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div>
              <Badge className="absolute top-2 left-2 bg-threat text-white text-xs">
                {item.type}
              </Badge>
              <div className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                {item.duration}
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-sm text-foreground">{item.type}</h3>
                <p className="text-xs text-muted-foreground">{item.camera}</p>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </div>
              
              {item.caseId && (
                <Badge variant="outline" className="text-xs">
                  {item.caseId}
                </Badge>
              )}
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
                  <FolderPlus className="h-3 w-3 mr-1" />
                  Add to Case
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
