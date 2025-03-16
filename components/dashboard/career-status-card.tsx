import { BarChart3, ExternalLinkIcon as External, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function CareerStatusCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Career Status</CardTitle>
          <Button variant="ghost" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Overall progress towards your career goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">Goal: Senior Software Engineer</div>
              <div className="text-muted-foreground">75%</div>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">Required Skills</div>
              <div className="text-muted-foreground">68%</div>
            </div>
            <Progress value={68} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">Experience Level</div>
              <div className="text-muted-foreground">82%</div>
            </div>
            <Progress value={82} className="h-2" />
          </div>

          <div className="rounded-lg border bg-muted/50 p-3">
            <div className="flex items-start gap-2">
              <TrendingUp className="mt-0.5 h-4 w-4 text-success" />
              <div>
                <div className="text-sm font-medium">On track for advancement</div>
                <div className="text-xs text-muted-foreground">Estimated timeline: 9-12 months</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full">
          View detailed analysis
        </Button>
      </CardFooter>
    </Card>
  )
}

