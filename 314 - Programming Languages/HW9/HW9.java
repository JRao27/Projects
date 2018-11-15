import java.util.*;
import java.lang.Class;
import java.lang.reflect.*;

class Point 
{
	public double x;
	public double y;

	public Point() {
		x = 0;
		y = 0;
	}
	
	public Point (double x, double y) {
		this.x = x;
		this.y = y;
	}
}

abstract class Shape {
	public abstract Point position();
	public abstract double area();
	
}

class Triangle extends Shape {
	
	private Point v1;
	private Point v2;
	private Point v3;
	
	public Triangle (Point v1, Point v2, Point v3) {
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
	}
	
	public Point position() {
		
		Point center = new Point();
		center.x = (v1.x + v2.x + v3.x)/3;
		center.y = (v1.y + v2.y + v3.y)/3;
		return center
	}
	
	public double area() {
		
		double s1 = Math.sqrt(Math.pow((v1.x-v2.x), 2) + Math.pow((v1.y-v2.y), 2));
		double s2 = Math.sqrt(Math.pow((v1.x-v3.x), 2) + Math.pow((v1.y-v3.y), 2));
		double s3 = Math.sqrt(Math.pow((v3.x-v2.x), 2) + Math.pow((v3.y-v2.y), 2));
		double finalS = (s1+s2+s3)/2;
		double finalArea = Math.sqrt((finalS)*(finalS - s1)*(finalS-s2)*(finalS-s3));
		return finalArea;
	}
	
	   @Override
    public int hashCode() {
        int hash = 7;
        hash = (int)(31 * hash + this.area() + this.position().x + this.position().y);
        hash = (int)(31 * hash + (null == v1 ? 0 : v1.hashCode()) 
            + (null == v2 ? 0 : v2.hashCode()) 
           + (null == v3 ? 0 : v3.hashCode()));
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
       if (!(obj instanceof Triangle))
            return false;
        if (obj == this)
            return true;

        Triangle rhs = (Triangle) obj;
        if ((this.area() == rhs.area())
                && (this.position().x == rhs.position().x)
                && (this.position().y == rhs.position().y))
        {   
            return true;
        }   
        else
        {   
            return false;
        }   
    } 
	
	@Override
	public void toString() {
		System.out.println("Triangle (" + v1.x + ", " + v1.y + ")-(" + v2.x + ", " + v2.y + ")-(" + v3.x + ", " + v3.y + ")\n area = " + this.area());
	}
}

class Rectangle extends Shape {
	
	private Point v1;
	private Point v2;
	
	public Rectangle (Point v1, Point v2, Point v3, Point v4) {
		this.v1 = v1;
		this.v2 = v2;
		
	}
	
	public Point position() {
		Point center = new Point();
		center.x = (v1.x + v2.x)/2;
		center.y = (v1.y + v2.y)/2;
		return center;
	}
	
	public double area() {
		double length = Math.abs(v1.x - v2.x);
		double width = Math.abs(v1.y - v2.y);
		return length*width;
	}
	
	@Override
	public int hashCode() {
		int hash = 7;
		hash = (int)(31*hash + this.area() + this.position().x + this.position().y);
		hash = (int)(31*has + (null == v1 ? 0: v1.hashCode()) + (null == v2 ? 0: v2.hashCode()));
		return hash;
	}
	
	public boolean equals (Object obj) {
		if (!(obj instanceof Triangle)) {
			return false;
		}
		if (obj == this) {
			return true;
		}
		
		Rectangle rhs = (Rectangle) obj;
		if ((this.area() == rhs.area()) 
			&& (this.position().x == rhs.position().x)
			&& (this.position().y == rhs.position().y) {
				return true;
			}
		else {
			return false;
		}	
		
	}
	 @Override
    public String toString()
    {
        String s = "Rectangle (" + tl.x + ", " + tl.y + ")-(" + br.x + ", " + br.y + ")" + "\tarea = " + this.area();
        return s;
    }

}
}

class Circle extends Shape {
	
	Point center; //always at center
	private double radius;
	
	Public Circle (Point center, double radius) {
		this.center = center;
		this.radius = radius;
	}
	
	Public Point position() {
		return center;
	}
	
	public double area() {
		double area = (Math.PI * radius * radius);
	}
	
	  @Override
    public int hashCode() {
        int hash = 7;
        hash = (int)(31 * hash + this.area() + this.position().x + this.position().y);
        hash = (int)(31 * hash + (null == center ? 0 : center.hashCode()) + radius);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
       if (!(obj instanceof Circle))
            return false;
        if (obj == this)
            return true;

        Circle rhs = (Circle) obj;
        if ((this.area() == rhs.area())
                && (this.position().x == rhs.position().x)
                && (this.position().y == rhs.position().y))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    @Override
    public String toString()
    {
        String s = "Circle (" + center.x + ", " + center.y + "), radius = " + radius + "\tarea = " + this.area();
        return s;
    }
}

private static calculate(Shape[] shapes) {
	double finalArea = 0;
	Shape s;
	for (int i = 0; i < shapes.size(); i++) {
		finalArea += s.area(); 
	}
}